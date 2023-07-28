import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  razorPayKeyconfig = environment.rzp.keyId;
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }
  
  createOrder(id: string, price: number) {
    const payload = {
      recieptId: id,
      amount: price
    };
    return this.http.post('api/payment/createPaymentOrder', { payload });
  }

  verifyPaymentSignature(checkoutResponse: any, original_order_id: string) {
    const payload = {
      razorpay_signature: checkoutResponse.razorpay_signature,
      original_order_id: original_order_id,
      razorpay_payment_id: checkoutResponse.razorpay_payment_id,
    };

    return this.http.post('api/payment/validatePayment', { payload });
  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }
  getRazorPayKey() {
    return (this.razorPayKeyconfig);
  }

}
