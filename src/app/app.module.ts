import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/Utility/navbar/navbar.component';
import { SidebarComponent } from './Components/Utility/sidebar/sidebar.component';
import { ClientHomePageComponent } from './Components/Client/client-home-page/client-home-page.component';
import { ClientDashboardComponent } from './Components/Client/client-dashboard/client-dashboard.component';
import { ClientTransactionsComponent } from './Components/Client/client-transactions/client-transactions.component';
import { AccountSettingsComponent } from './Components/Client/account-settings/account-settings.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { ExpenseDetailsComponent } from './Components/Client/expense-details/expense-details.component';
import { ClientPageLayoutComponent } from './Components/Client/client-page-layout/client-page-layout.component';
import { SharedService } from 'src/Services/SharedService/shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PaymentsComponent } from './Components/Payments/payments/payments.component';
import { BaseUrlInterceptor } from 'src/interceptors/url-interceptor/base-url.interceptor';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ClientHomePageComponent,
    ClientDashboardComponent,
    ClientTransactionsComponent,
    AccountSettingsComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    ExpenseDetailsComponent,
    ClientPageLayoutComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [ 
    SharedService,
    HttpClientModule,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: NgChartsConfiguration, useValue: { genarateColors : false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
