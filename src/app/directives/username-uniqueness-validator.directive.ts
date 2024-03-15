import { Directive } from '@angular/core';
import {
  NG_ASYNC_VALIDATORS,
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';

import { UserService } from '../services/user.service';

@Directive({
  selector: '[appUniqueUsernameValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UserNameAsyncUniquenessValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class UserNameAsyncUniquenessValidatorDirective
  implements AsyncValidator
{
  constructor(private userService: UserService) {}
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const username = control.value;
    return this.userService.isUsernameUnique(username).pipe(
      map((usernameExists) =>
        usernameExists ? { usernameTaken: true } : null
      ),
      catchError(() => of(null))
    );
  }
}
