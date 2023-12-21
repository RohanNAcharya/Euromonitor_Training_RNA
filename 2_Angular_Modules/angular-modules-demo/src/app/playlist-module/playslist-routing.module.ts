import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';


const routes: Routes = [
  { path: 'Playlist', component: PlaylistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
