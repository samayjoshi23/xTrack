import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService/auth.service';
import { UserService } from 'src/Services/UserData/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(
    private auth : AuthService,
    private user : UserService,
    private router: Router
  ) 
  {
    this.loginForm = new FormGroup({
      email : new FormControl("", [Validators.required, Validators.minLength(3), Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(5)]),
    });
  }
    
  ngOnInit(): void { }
  
  async login(){
    let email = this.loginForm.value.email;
    let passowrd = this.loginForm.value.password;
    const { data, error } = await this.auth.login(email, passowrd);
    if(data.user!.role === 'authenticated'){
      let userData = await this.user.getUserForAuth(data.user.id);
      if(userData.data){
        this.router.navigate(['user',userData.data[0].userId,'dashboard']);
      }
    }
    else
      console.log(error);

    this.loginForm.reset();
  }

  togglePass(el: HTMLInputElement){
    if(el.type == 'text'){
      el.type = 'password';
    }
    else{
      el.type = 'text';
    }
  }
}
