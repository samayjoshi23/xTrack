import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/Guard/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedService } from 'src/Services/SharedService/shared.service';
import { SidebarComponent } from '../Utility/sidebar/sidebar.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/:id',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
];


@NgModule({
  declarations: [
    LayoutComponent,
    AdminDashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SharedService
  ]
})
export class AdminModule { }
