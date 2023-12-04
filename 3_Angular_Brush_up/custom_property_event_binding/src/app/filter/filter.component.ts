import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input() all: number = 0;
  @Input() male: number = 0;
  @Input() female: number = 0;

  selectedRadioButon: string = 'All';

  @Output()
  radioButtonChange: EventEmitter<string> = new EventEmitter<string>;

  onRadioButtonChange(){
    this.radioButtonChange.emit(this.selectedRadioButon);
  }
}
