import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userData: any = {
    id: '',
    name: '',
    email: '',
    phone: null,
    role: ''
  }
  isFieldsUnique: boolean = true;
  signupForm : FormGroup;

  constructor(
    private auth : AuthService,
    private router: Router
    ) {
    this.signupForm = new FormGroup({
      name : new FormControl("", [Validators.required,Validators.minLength(3)]),
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(5)]),
      cpassword : new FormControl("", [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
  }

  async register(){
    this.isFieldsUnique = true;
    if(this.signupForm.value.password !== this.signupForm.value.cpassword){
      alert('Passwords are not matching');
      // this.toast.showToast("Passwords are not matching", ToastTypes.Warning);
      return;
    }
    
    // let data = await this.auth.signUp(this.signupForm.value);
    // console.log(data);
    this.auth.signUp(this.signupForm.value).subscribe({
      next: (result) => {
        console.log(result);
        // if(result?.data.user?.identities?.length  == 0){
        //   alert('email already exists');
        // }
        // else{
        //   alert('welcome to xTrack');
        //   this.router.navigate(['/auth/login']);
        // }
      },
      error: (err) => {
        console.log(err);
        // Add notification as : "Email or phone already exists"
      }
    });
    // this.signupForm.reset();
  }
  
  togglePass(el: HTMLInputElement){
    if(el.type == 'text'){
      el.type = 'password'
    }
    else{
      el.type = 'text'
    }
  }
}
