import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from '../Payments/payments/payments.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientTransactionsComponent } from './client-transactions/client-transactions.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { SidebarComponent } from './../Utility/sidebar/sidebar.component';
import { AuthGuard } from 'src/Guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { LayoutComponent } from './layout/layout.component';
import { SharedService } from 'src/Services/SharedService/shared.service';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/:id',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transactions/:id',
    component: ClientTransactionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'graphs/:id',
    component: ExpenseDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/:id',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment/:id',
    component: PaymentsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    SidebarComponent,
    AccountSettingsComponent,
    PaymentsComponent,
    ExpenseDetailsComponent,
    ClientTransactionsComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgChartsModule
  ],
  providers: [
    DatePipe,
    SharedService,
    CurrencyPipe,
    {
      provide: NgChartsConfiguration, useValue: { genarateColors : false }
    }
  ]
})
export class ClientModule { }
