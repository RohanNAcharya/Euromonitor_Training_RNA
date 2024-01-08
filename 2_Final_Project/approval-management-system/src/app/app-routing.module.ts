import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { ManagerNavComponent } from './manager/manager-nav/manager-nav.component';
import { UserRequestFormComponent } from './user/user-request-form/user-request-form.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserMyRequestsComponent } from './user/user-my-requests/user-my-requests.component';
import { UserViewHistoryComponent } from './user/user-view-history/user-view-history.component';
import { CanActivateUser } from './guards/auth.guard';
import { UserUploadBillComponent } from './user/user-upload-bill/user-upload-bill.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'user-home', component: UserHomeComponent, /*canActivate: [CanActivateUser],*/  children: [
    {path: 'user-request-form', component: UserRequestFormComponent, /*canActivate: [CanActivateUser]*/},
    {path: '', redirectTo: 'user-request-form', pathMatch: 'full'},
    {path: 'user-my-requests', component: UserMyRequestsComponent, /*canActivate: [CanActivateUser]*/},
    {path: 'user-view-history', component: UserViewHistoryComponent, /*canActivate: [CanActivateUser]*/},
    {path: 'user-upload-bill', component: UserUploadBillComponent, /*canActivate: [CanActivateUser]*/}
  ]},
  {path: 'manager-home', component: ManagerHomeComponent, children: [
    {path: 'manager-request-form', component: UserRequestFormComponent, /*canActivate: [CanActivateUser]*/},
    {path: '', redirectTo: 'manager-request-form', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
