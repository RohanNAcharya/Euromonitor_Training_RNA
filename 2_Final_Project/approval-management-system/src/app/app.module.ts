import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialImportsModule } from './modules/material-imports/material-imports.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { ManagerNavComponent } from './manager-nav/manager-nav.component';
import { UserRequestFormComponent } from './user/user-request-form/user-request-form.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserViewHistoryComponent } from './user/user-view-history/user-view-history.component';
import { UserMyRequestsComponent } from './user/user-my-requests/user-my-requests.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserNavComponent,
    ManagerNavComponent,
    UserRequestFormComponent,
    UserHomeComponent,
    UserViewHistoryComponent,
    UserMyRequestsComponent,
    LogoutDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
