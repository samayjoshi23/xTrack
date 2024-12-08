import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomePageComponent } from './Components/Client/client-home-page/client-home-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClientHomePageComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./Components/Client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./Components/Admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./Components/Auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
