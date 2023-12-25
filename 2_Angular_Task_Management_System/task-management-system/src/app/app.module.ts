import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialImportsModule } from './modules/material-imports/material-imports.module';
import { TaskListComponent } from './task-list/task-list.component';
import { AddEditTaskFormComponent } from './add-edit-task-form/add-edit-task-form.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryStyleDirective } from './Directives/category-style.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TaskListComponent,
    AddEditTaskFormComponent,
    CompletedTaskComponent,
    CategoryStyleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
