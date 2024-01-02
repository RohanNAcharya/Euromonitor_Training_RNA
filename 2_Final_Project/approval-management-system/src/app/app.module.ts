import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UpdatecomponentComponent } from './updatecomponent/updatecomponent.component';
import { MaterialImportsModule } from './modules/material-imports/material-imports.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpdatecomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
