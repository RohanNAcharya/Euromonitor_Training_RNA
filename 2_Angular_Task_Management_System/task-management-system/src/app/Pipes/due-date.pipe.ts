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

  returnData(daysDifference:number, value:string):string{
    const datePipe = new DatePipe('en-US');
    if(daysDifference === 0){
      return `<span><b>Due Today</b></span>`;
    }else if(daysDifference>=1 && daysDifference <= 6){
      return `<span><b>Due in ${daysDifference} days</b></span>`;
    } else if (daysDifference >=7){
      return `<span><b>Due by ${datePipe.transform(value, 'dd-MMMM-yyyy')}</b></span>`;
    }else{
      return `<span><b>${datePipe.transform(value, 'dd-MMMM-yyyy')}</b></span>`;
    }
  }

}
