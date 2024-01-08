import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialImportsModule } from './modules/material-imports/material-imports.module';
import { RegisterComponent } from './authentication/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { ManagerNavComponent } from './manager/manager-nav/manager-nav.component';
import { UserRequestFormComponent } from './user/user-request-form/user-request-form.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserViewHistoryComponent } from './user/user-view-history/user-view-history.component';
import { UserMyRequestsComponent } from './user/user-my-requests/user-my-requests.component';
import { LogoutDialogComponent } from './dialog-popups/logout-dialog/logout-dialog.component';
import { EditRequestComponent } from './dialog-popups/edit-request/edit-request.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WithdrawDialogComponent } from './dialog-popups/withdraw-dialog/withdraw-dialog.component';
import { UserUploadBillComponent } from './user/user-upload-bill/user-upload-bill.component';
import { FormsModule } from '@angular/forms';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';

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
    EditRequestComponent,
    WithdrawDialogComponent,
    UserUploadBillComponent,
    ManagerHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
