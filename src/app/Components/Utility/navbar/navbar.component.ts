import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggelSidebarEvent = new EventEmitter<boolean>();
  hamburgerToggle: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  sidebarSwitch(value: boolean){
    this.hamburgerToggle = value;
    this.toggelSidebarEvent.emit(value);
  }

}
