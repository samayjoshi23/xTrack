import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomePageComponent } from './Components/Client/client-home-page/client-home-page.component';
import { ClientDashboardComponent } from './Components/Client/client-dashboard/client-dashboard.component';
import { ClientTransactionsComponent } from './Components/Client/client-transactions/client-transactions.component';
import { ExpenseDetailsComponent } from './Components/Client/expense-details/expense-details.component';
import { AccountSettingsComponent } from './Components/Client/account-settings/account-settings.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: ClientHomePageComponent
  },
  {
    path: 'user/:id',
    component: ClientDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: ClientDashboardComponent
      },
      {
        path: 'transactions',
        component: ClientTransactionsComponent
      },
      {
        path: 'graphs',
        component: ExpenseDetailsComponent
      },
      {
        path: 'settings',
        component: AccountSettingsComponent
      },
    ]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      // {
      //   path: 'transactions',
      //   component: ClientTransactionsComponent
      // },
      // {
      //   path: 'graphs',
      //   component: ExpenseDetailsComponent
      // },
      // {
      //   path: 'settings',
      //   component: AccountSettingsComponent
      // },
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
