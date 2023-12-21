import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistRoutingModule } from './playslist-routing.module';


@NgModule({
  declarations: [
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    PlaylistRoutingModule
  ],
  
})
export class PlaylistModule { }
