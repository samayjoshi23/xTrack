import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/Services/AuthService/auth.service';
import { SharedService } from 'src/Services/SharedService/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isActive: boolean = false;
  public isLoggedIn: boolean = false;
  public colorMode: string = 'light';
  public body = document.querySelector('body') as HTMLBodyElement;


  constructor(private sharedService: SharedService, private authService : AuthService) { }
  ngOnInit(): void {
    this.setUserLoginState();
  }
  
  sidebarSwitch(){
    this.isActive = !this.isActive;
    this.sharedService.toggleSidebarVisibility(this.isActive);
  }
  
  colorModeSwitch(mode: string){
    this.colorMode = mode;
    if(mode == 'light'){
      this.body.classList.add('light')
      this.body.classList.remove('dark')
    }
    else{
      this.body.classList.add('dark')
      this.body.classList.remove('light')
    }
  }
  
  setUserLoginState(){
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  logout(){
    const res = this.authService.logout();
    console.log(res);
    this.authService.removeToken();
    this.setUserLoginState();
  }

}
