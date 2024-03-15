import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchValidatorDirective, multi: true }],
  standalone: true
})
export class PasswordMatchValidatorDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const originalPassword = control.parent?.get('password')?.value;
    const confirmPassword = control.value;
    if (originalPassword && confirmPassword && (originalPassword !== confirmPassword)) {
      return { passwordmatcherror: true };
    }
    
    return null;
  }
}