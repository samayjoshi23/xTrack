import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  
  async getUserData(){
    if(this.loggedInUserId){
      const res = await this.user.getUserByUserId(this.loggedInUserId);
      if(res.error){
        console.log(res.error);
      }
      else{
        console.log(res.data);
        this.UserDetals = res.data[0];
      }
    }
  }
}
