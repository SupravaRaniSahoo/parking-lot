import { FormGroup } from '@angular/forms';
    
export function ConfirmValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['matching']){
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ matching: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}