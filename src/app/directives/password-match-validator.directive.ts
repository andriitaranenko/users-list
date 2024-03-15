import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class PasswordMatchValidatorDirective implements Validator {
  @Input() passwordControlName: string = 'password';

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const originalPassword = control.parent?.get(
      this.passwordControlName
    )?.value;
    const confirmPassword = control.value;
    if (
      originalPassword &&
      confirmPassword &&
      originalPassword !== confirmPassword
    ) {
      return { passwordmatcherror: true };
    }

    return null;
  }
}
