import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { UserFormComponent } from '../../user-form/user-form.component';
import { ButtonComponent } from '../../button/button.component';
import { GenericUserComponent } from '../generic-user.component';
import { UserComponentActions } from '../../../models/user.model';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, UserFormComponent, ButtonComponent, JsonPipe],
  templateUrl: './create-user.component.html',
  styleUrls: ['../generic-user.components.css', './create-user.component.css'],
})
export class CreateUserComponent extends GenericUserComponent {
  override userFormControlKey = 'createUserForm';

  createUser(): void {
    if (!this.form.valid) return;

    this.onClose$.next({
      type: UserComponentActions.CREATE_USER,
      user: { ...this.form.get(this.userFormControlKey)?.value },
    });
  }
}
