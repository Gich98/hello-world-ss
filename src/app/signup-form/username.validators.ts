import { AbstractControl, ValidationErrors } from "@angular/forms";

//Custom validator
export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >=0 ){
            return {cannotContainSpace: true};
        }
        return null;
    }

    //Esempio async validator (ad esempio quando si scaricano i dati dal server)
    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null>{
        // resolve e reject sono due funzioni
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(control.value === 'mosh'){
                    resolve({shouldBeUnique: true});
                }else{
                    resolve(null);
                }
            }, 2000);
        })
    }
}