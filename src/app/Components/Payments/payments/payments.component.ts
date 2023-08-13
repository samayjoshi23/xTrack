import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RazorpayService } from 'src/Services/RazorpayService/razorpay.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  razorPayKey: any;
  paymentOrderId: any;
  amountToPay: number = 0;

  public options: any = {
    key: environment.rzp.keyId,
    amount: 0, // amount in paise
    currency: 'INR',
    name: 'xTrack',
    description: 'Premium purchase',
    image: 'assets/logo.png', // path to your company logo
    order_id: '',
    callback_url: 'http://localhost:4200/user/123nbkj12ln412/payment',
    handler: (response: any) => {
      // handle the success response
      console.log(response);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#F37254',
    },
  };

  constructor(
    private razorpayService: RazorpayService,
    private ActRoute: ActivatedRoute,
    private router: Router
  ) {
    this.paymentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
        Validators.maxLength(10),
      ]),
      amount: new FormControl(151, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void { }


  createNewOrder(){    
    let guid = uuidv4().split('-');
    let Id = `order_${guid[0]}${guid[1]}${guid[2]}`;
    let price = this.paymentForm.value.amount;
    this.razorpayService.createOrder(Id, price).subscribe({
      next: (res : any) => {
        console.log(res);
        this.paymentOrderId = res?.data.id;


        this.Pay();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setAmount(amt: number) {
    this.paymentForm.controls['amount'].setValue(amt);
  }

  Pay() {
    this.options.order_id = this.paymentOrderId;
    this.options.prefill.name = this.paymentForm.value.name;
    this.options.prefill.email = this.paymentForm.value.email;
    this.options.prefill.contact = this.paymentForm.value.phone;

    this.options.handler = (response: any, error: any) => {
      this.options.response = response;
      console.log('handler response : ', response);
      if (error) {
        console.log('error', error);
      }
      else {
        this.razorpayService.verifyPaymentSignature(response, this.paymentOrderId).subscribe((response: any) => {
            response.data.isPaymentVerfied
              ? console.log('payment success')
              : console.log('payment success')
          });
      }
    };
    // this.options.modal.ondismiss = () => {
    //   // handle the case when user closes the form while transaction is in progress
    //   alert('Transaction has been cancelled.');
    //   this.router.navigateByUrl('');
    // };
    const rzp = new this.razorpayService.nativeWindow.Razorpay(this.options);
    rzp.open();
  }
}
