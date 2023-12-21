import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { DetailsModule } from './details-module/details.module';
import { PlaylistModule } from './playlist-module/playlist.module';
import { PlaylistRoutingModule } from './playlist-module/playslist-routing.module';
import { DetailsRoutingModule } from './details-module/details-routing.module';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './common-module/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    DetailsModule,
    PlaylistModule,
    CommonModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
