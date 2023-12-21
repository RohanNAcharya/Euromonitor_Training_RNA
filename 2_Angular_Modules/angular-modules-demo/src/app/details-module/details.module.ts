import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { SongDetailsComponent } from './song-details/song-details.component';
import { DetailsRoutingModule } from './details-routing.module';


@NgModule({
  declarations: [
    SongDetailsComponent
  ],
  imports: [
    BrowserModule,
    DetailsRoutingModule
  ],
  
})
export class DetailsModule { }
