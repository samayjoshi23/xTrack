import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService/auth.service';
import { SharedService } from 'src/Services/SharedService/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isActive: boolean = false;
  public isLoggedIn$ = this.sharedService.isLoggedIn$;
  public userAppId$ = this.sharedService.userAppId$;
  public colorMode: string = 'light';
  public body = document.querySelector('body') as HTMLBodyElement;


  constructor(
    private sharedService: SharedService,
    private authService : AuthService,
    private router : Router
  ) { }
  ngOnInit(): void { }
  
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

}
