import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sideBarItems!: any[];
  @Output() setItemActive = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {}

  setActive(id: number){
    this.setItemActive.emit(id);
  }
}
