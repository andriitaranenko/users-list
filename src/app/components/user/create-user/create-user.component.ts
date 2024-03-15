import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { UserFormComponent } from '../../user-form/user-form.component';
import { ButtonComponent } from '../../button/button.component';
import { GenericUserComponent } from '../generic-user.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, UserFormComponent, ButtonComponent, JsonPipe],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent extends GenericUserComponent {
  override userFormControlKey = 'createUserForm';
  createUser() {
    if (!this.form.valid) return;

    this.onClose$.next({
      type: 'CreateUser',
      user: { ...this.form.get(this.userFormControlKey)?.value },
    });
  }
}
