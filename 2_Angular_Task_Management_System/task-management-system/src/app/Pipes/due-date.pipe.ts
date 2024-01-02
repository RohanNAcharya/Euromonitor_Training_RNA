import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'dueDateFormat'
})
export class DueDatePipe implements PipeTransform {

  transform(value: string): string {
    const inputDate = new Date(value);
    const currentDate = new Date();
    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const timeDifference = inputDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return this.returnData(Number(daysDifference), value);
  }

  returnData(daysDifference: number, value: string): string {
    const datePipe = new DatePipe('en-US');
    let returnText: string = "";

    (daysDifference === 0) ? returnText = `<span><b>Due Today</b></span>` : 
      (daysDifference >= 1 && daysDifference <= 6) ? returnText =  `<span><b>Due in ${daysDifference} days</b></span>` :
        (daysDifference >= 7) ? returnText = `<span><b>Due by ${datePipe.transform(value, 'dd-MMMM-yyyy')}</b></span>` : 
          returnText = `<span><b>${datePipe.transform(value, 'dd-MMMM-yyyy')}</b></span>`

    return returnText;
  }

}
