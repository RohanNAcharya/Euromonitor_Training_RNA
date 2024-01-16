import { AbstractControl, ValidatorFn } from "@angular/forms";


export class CustomValidators{
    static noSpaceAllowed: ValidatorFn = (control: AbstractControl) => {
        if(control.value != null && control.value.indexOf(' ')!= -1){
            return { noSpaceAllowed: true }
        }
        return null;
    }

    static dateError: ValidatorFn = (control: AbstractControl) => {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();

        selectedDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        if(!(selectedDate >= currentDate)){
            return { dateError: true };
        }
        return null;
    }
}


