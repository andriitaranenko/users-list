import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { UserFormComponent } from '../../user-form/user-form.component';
import { IUser, UserComponentActions } from '../../../models/user.model';
import { GenericUserComponent } from '../generic-user.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, UserFormComponent, ButtonComponent],
  templateUrl: './update-user.component.html',
  styleUrls: ['../generic-user.components.css', './update-user.component.css'],
})
export class UpdateUserComponent extends GenericUserComponent {
  override userFormControlKey = 'updateUserForm';

  @Input() user!: IUser;

  updateUser(): void {
    if (!this.form.valid) return;

    this.onClose$.next({
      type: UserComponentActions.UPDATE_USER,
      user: { ...this.form.get('userForm')?.value, id: this.user.id },
    });
  }

  deleteUser(): void {
    this.onClose$.next({
      type: UserComponentActions.DELETE_USER,
      user: this.user,
    });
  }
}
