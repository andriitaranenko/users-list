import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value: string = control.value ?? '';

    // regex to check if string has at least 8 chars, at least one letter and at least 1 number
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    return regex.test(value) ? null : { invalidPassword: true };
  }
}
