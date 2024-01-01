import { AbstractControl, ValidatorFn } from "@angular/forms";


export class CustomValidators{
    static noSpaceAllowed:ValidatorFn  = (control: AbstractControl) => {
        if(control.value != null && control.value.indexOf(' ') != -1){
            return {noSpaceAllowed: true}
        }
        return null;
    }

    static checkUserName(control:AbstractControl): Promise<any>{
        return userNameAllowed(control.value);
    }
}


function userNameAllowed(username: string){
    const takenUserNames = ['jennieruby', 'sanazhang', 'rohanacharya'];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(takenUserNames.includes(username))
            {
                resolve({checkUserName: true});
            }
            else{
                resolve(null);
            }
        }, 5000);
    })
}