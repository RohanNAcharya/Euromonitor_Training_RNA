import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { setBackgroundColorDiective } from './CustomDirectives/setBackground.directive';
import { HoverDirective } from './CustomDirectives/hover.directive';
import { BetterhighlightDirective } from './CustomDirectives/betterhighlight.directive'

@NgModule({
  declarations: [
    AppComponent,
    setBackgroundColorDiective,
    HoverDirective,
    BetterhighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
