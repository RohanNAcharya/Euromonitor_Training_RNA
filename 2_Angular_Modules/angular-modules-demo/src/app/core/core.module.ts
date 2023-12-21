import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

@NgModule({
  providers: [
    provideClientHydration()
  ]
})
export class CoreModule { }
