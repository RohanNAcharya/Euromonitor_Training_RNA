import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lifecyclehooks';

  inputText: string = '';
  destroy: boolean = true;

  OnSubmit(inputEl:HTMLInputElement){
    this.inputText = inputEl.value;
  }

  DestroyComponent(){
    this.destroy = false;
  }

}
