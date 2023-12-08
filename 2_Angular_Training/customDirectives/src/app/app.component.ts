import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customDirectives';

  active:boolean = Math.floor(Math.random()*10) > 5 ? true : false;

  display: boolean = false;

  occupation: string = "teacher";

  DisplayNotice(){
    this.display = true;
  }
}
