import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}],
  standalone: true
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value: string = control.value ?? '';

    if (value.length < 8) {
      return { invalidPassword: true }
    }

    // Check if the value contains at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (!hasLetter || !hasNumber) {
      // Password does not meet the criteria
      return { invalidPassword: true };
    }

    // Password is valid
    return null;
  }
}