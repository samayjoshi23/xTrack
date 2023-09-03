import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService/auth.service';
import { SharedService } from 'src/Services/SharedService/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sideBarItems!: any[];
  @Output() setItemActive = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  setActive(id: number){
    this.setItemActive.emit(id);
  }

  logout(){
    this.authService.logout().subscribe({
      next: (result) => {
        console.log(result);
        this.removeUser();
      },
      error: (err) => {
        console.log(err);
        this.removeUser();
      }
    });
  }

  removeUser(){
    this.sharedService.toggleUserLoginStatus(false);
    this.router.navigate(["/"]);
    this.authService.removeToken();
  }
}
