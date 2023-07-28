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
    private userService : UserService,
    private router: Router
  ) 
  {
    this.loginForm = new FormGroup({
      email : new FormControl("", [Validators.required, Validators.minLength(3), Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(5)]),
    });
  }
    
  ngOnInit(): void { }
  
  login(){
    let email = this.loginForm.value.email;
    let passowrd = this.loginForm.value.password;
    this.auth.login(email, passowrd).subscribe({
      next: (result : any) => {
        if(result.data.user.role === "authenticated"){
          if(result.data.access_token){
            this.auth.setAuthToken(result.data.access_token);
          }
          this.router.navigate(['user', result.data.user.id, 'dashboard']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

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
