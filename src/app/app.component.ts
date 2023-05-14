import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public showSidebar: boolean = false;

  toggleSidebar(isVisible: boolean){
    this.showSidebar = isVisible;
  }
  title = 'xTrack';
}