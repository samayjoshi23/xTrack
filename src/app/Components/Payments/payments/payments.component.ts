import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/Services/AuthService/auth.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {

  paymentForm : FormGroup;

  constructor(private authService: AuthService) {
    this.paymentForm = new FormGroup({
      name : new FormControl("", [Validators.required, Validators.minLength(3)]),
      email : new FormControl("", [Validators.required, Validators.email]),
      phone : new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10)]),
      amount : new FormControl(11, [Validators.required, Validators.min(1)]),
    });
  }
  ngOnInit(): void { }

  public options : any = {
    key: environment.rzp.keyId,
    amount: 0, // amount in paise
    currency: 'INR',
    name: 'xTrack',
    description: 'Premium purchase',
    image: 'assets/logo.png', // path to your company logo
    order_id: '',
    callback_url: "http://localhost:4200/user/123nbkj12ln412/payment",
    handler: (response: any) => {
      // handle the success response
      console.log(response);
    },
    prefill: {
      name: '',
      email: '',
      contact: ''
    },    
    notes: {
      address: "Razorpay Corporate Office"
    },
    theme: {
      color: '#F37254'
    }
  };

  setAmount(amt: number){
    this.paymentForm.controls['amount'].setValue(amt);
  }


  Pay() {
    console.log(this.paymentForm.value);
    let guid = uuidv4().split('-');
    let trackingId = `order_${guid[0]}${guid[1]}${guid[2]}`;
    this.options.amount = this.paymentForm.value.amount * 100;
    this.options.prefill.name = this.paymentForm.value.name;
    this.options.prefill.email = this.paymentForm.value.email;
    this.options.prefill.contact = this.paymentForm.value.phone;
    // this.options.order_id = trackingId;

    console.log(this.options);
    
    const rzp = new this.authService.nativeWindow.Razorpay(this.options);
    rzp.open();
  }
}
