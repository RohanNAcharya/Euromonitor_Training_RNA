import { AbstractControl, ValidatorFn } from "@angular/forms";


export class CustomValidators{
    static noSpaceAllowed: ValidatorFn = (control: AbstractControl) => {
        if(control.value != null && control.value.indexOf(' ')!= -1){
            return { noSpaceAllowed: true }
        }
        return null;
    }
}


