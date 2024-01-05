import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { ManagerNavComponent } from './manager-nav/manager-nav.component';
import { UserRequestFormComponent } from './user/user-request-form/user-request-form.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserMyRequestsComponent } from './user/user-my-requests/user-my-requests.component';
import { UserViewHistoryComponent } from './user/user-view-history/user-view-history.component';
import { CanActivateUser } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'user-home', component: UserHomeComponent, /*canActivate: [CanActivateUser],*/  children: [
    {path: 'user-request-form', component: UserRequestFormComponent, /*canActivate: [CanActivateUser]*/},
    {path: '', redirectTo: 'user-request-form', pathMatch: 'full'},
    {path: 'user-my-requests', component: UserMyRequestsComponent, /*canActivate: [CanActivateUser]*/},
    {path: 'user-view-history', component: UserViewHistoryComponent, /*canActivate: [CanActivateUser]*/}
  ]},
  {path: 'manager-home', component: ManagerNavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
