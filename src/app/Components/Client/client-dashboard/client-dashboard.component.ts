import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableToQueryStringParams } from 'src/Models/TableQueryParams';
import { UserService } from 'src/Services/UserData/user.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {


  public loggedInUserId : string  | null = '';
  public UserDetals : any = {
    name: '',
    email: '',
    appId: '',
    userId: ''
  }
  public tableObj:TableToQueryStringParams = {
    table: "Users",
    alias: "",
    getAll: true,
    joinWithTable: [],
    columns: [],
    range: null,
    filters: {}
  };


  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private user: UserService
  ) { }


  ngOnInit(): void {
    this.actRoute.parent?.paramMap.subscribe(params => {
      this.loggedInUserId = params.get('id');
    });
    this.getUserData();
  }

  
  getUserData(){
    if(this.loggedInUserId){
      this.user.getUserData(this.tableObj).subscribe({
        next: (result : any) => {
          this.UserDetals = result.data[0];
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
