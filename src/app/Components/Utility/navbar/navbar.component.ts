import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/Services/SharedService/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isActive: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void { }

  sidebarSwitch(){
    this.isActive = !this.isActive;
    // this.toggelSidebarEvent.emit(this.isActive);
    this.sharedService.toggleSidebarVisibility(this.isActive);
  }

}
