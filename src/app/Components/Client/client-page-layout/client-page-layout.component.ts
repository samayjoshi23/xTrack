import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/Services/SharedService/shared.service';

@Component({
  selector: 'app-client-page-layout',
  templateUrl: './client-page-layout.component.html',
  styleUrls: ['./client-page-layout.component.css'],
})
export class ClientPageLayoutComponent implements OnInit {

  private userId: string = '123nbkj12ln412';
  private userType: string = 'user'
  public sideBarItems:any[] = [
    {
      id:0,
      title: 'Dashboard',
      iconClass: 'fa-solid fa-gauge-high item-icon',
      isActive: true,
      link: 'dashboard'
    },
    {
      id: 1,
      title: 'Graph',
      iconClass: 'fa-solid fa-chart-line item-icon',
      isActive: false,
      link: 'graphs'
    },
    {
      id: 2,
      title: 'Transactions',
      iconClass: 'fa-solid fa-list-check item-icon',
      isActive: false,
      link: 'transactions'
    },
    {
      id: 3,
      title: 'Account Settings',
      iconClass: 'fa-solid fa-gear item-icon',
      isActive: false,
      link: 'settings'
    }
  ]


  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }
  isVisible$ = this.sharedService.sidebarVisible$;

  ngOnInit(): void { }

  setActive(id: number){
    this.sideBarItems.forEach(item => {
      item.isActive = false;
      if(item.id == id){
        item.isActive = true;
      }
    })
    this.router.navigate([this.userType, this.userId, this.sideBarItems[id].link ]);
  }

}
