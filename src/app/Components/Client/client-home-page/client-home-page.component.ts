import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-home-page',
  templateUrl: './client-home-page.component.html',
  styleUrls: ['./client-home-page.component.css']
})
export class ClientHomePageComponent implements OnInit {

  constructor() { }

  public appDescription : string[] = [
    'Online expense management',
    'Everything in one place',
    'Detailed analysis',
    'Have a clear overview of a your expenditures'
  ]


  ngOnInit(): void {
  }

}
