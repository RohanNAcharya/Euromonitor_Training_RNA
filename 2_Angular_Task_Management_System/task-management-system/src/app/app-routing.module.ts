import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { CompletedTaskComponent } from './Components/completed-task/completed-task.component';
import { CanActivate } from './auth.guard';


const routes: Routes = [
  { path:'home', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path:'signup', component: SignupComponent},
  { path:'taskList', component: TaskListComponent, canActivate: [CanActivate]},
  { path:'completed', component: CompletedTaskComponent, canActivate: [CanActivate]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
