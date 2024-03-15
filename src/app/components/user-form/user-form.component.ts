import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IUser } from '../../models/user.model';
import { PasswordMatchValidatorDirective } from '../../directives/password-match-validator.directive';
import { PasswordValidatorDirective } from '../../directives/password-validator.directive';
import { UserNameAsyncUniquenessValidatorDirective } from '../../directives/username-uniqueness-validator.directive';
import { errorMessages } from '../../models/errors.models';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    PasswordValidatorDirective,
    PasswordMatchValidatorDirective,
    UserNameAsyncUniquenessValidatorDirective,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() user: IUser | undefined = undefined;

  private readonly parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  get formGroup(): FormGroup {
    return this.parentFormGroup.get(this.controlKey) as FormGroup;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.generateEmptyUserForm();

    if (this.user) {
      this.populateUserForm(this.user);
    }
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  generateEmptyUserForm(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.formBuilder.group({
        username: [null, [Validators.required]],
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        type: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        passwordRepeat: [null, [Validators.required]],
      })
    );
  }

  populateUserForm(user: IUser): void {
    const formControl = this.parentFormGroup.get(this.controlKey);
    if (formControl) {
      formControl.patchValue({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
      });
    }
  }

  isControlValid(controlName: string): boolean {
    return Boolean(
      this.formGroup?.get(controlName)?.touched &&
        this.formGroup?.get(controlName)?.errors !== null
    );
  }

  controlShowError(controlName: string, error: string): boolean {
    const control = this.formGroup?.get(controlName);
    if (control) {
      return control.touched && control.hasError(error);
    }
    return false;
  }

  getErrorMessage(error: string, formFieldName?: string): string {
    if (error in errorMessages && error === 'required') {
      return `${formFieldName ?? 'This field'} ${errorMessages['required']}`;
    } else if (error in errorMessages) {
      return errorMessages[error as keyof typeof errorMessages];
    }

    return '';
  }
}
