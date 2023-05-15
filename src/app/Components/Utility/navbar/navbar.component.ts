import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/Services/SharedService/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isActive: boolean = false;
  public colorMode: string = 'light';
  public body = document.querySelector('body') as HTMLBodyElement;
  
  constructor(private sharedService: SharedService) { }
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
