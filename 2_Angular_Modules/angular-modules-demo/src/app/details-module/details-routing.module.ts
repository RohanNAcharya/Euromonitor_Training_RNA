import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongDetailsComponent } from './song-details/song-details.component';

const routes: Routes = [
  { path: 'Details', component: SongDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
