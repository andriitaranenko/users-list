import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { UserFormComponent } from '../../user-form/user-form.component';
import { IUser } from '../../../models/user.model';
import { GenericUserComponent } from '../generic-user.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, UserFormComponent, ButtonComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent extends GenericUserComponent {
  override userFormControlKey = 'updateUserForm';

  @Input() user!: IUser;

  updateUser() {
    if (!this.form.valid) return;

    this.onClose$.next({
      type: 'UpdateUser',
      user: { ...this.form.get('userForm')?.value, id: this.user.id }
    });
  }

  deleteUser() {
    this.onClose$.next({
      type: 'DeleteUser',
      user: this.user
    });
  }
}
