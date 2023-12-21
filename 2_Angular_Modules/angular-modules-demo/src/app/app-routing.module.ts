import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongDetailsComponent } from './details-module/song-details/song-details.component';
import { HomeComponent } from './common-module/home/home.component';
import { PageNotFoundComponent } from './common-module/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent},
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
