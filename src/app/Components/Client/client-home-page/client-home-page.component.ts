import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Services/UserData/user.service';

@Component({
  selector: 'app-client-home-page',
  templateUrl: './client-home-page.component.html',
  styleUrls: ['./client-home-page.component.css']
})
export class ClientHomePageComponent implements OnInit {

  constructor(private userService: UserService) { }

  public appDescription : string[] = [
    'Online expense management',
    'Everything in one place',
    'Detailed analysis',
    'Have a clear overview of a your expenditures'
  ]

  ngOnInit(): void {
    this.userService.getHomeData().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
