import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable, Subject, of, switchMap, takeUntil } from 'rxjs';

import { IUser, UserComponentType, UserEmittedData } from '../../models/user.model';
import { ToasterService } from '../../services/toaster.service';
import { UserService } from '../../services/user.service';
import { CreateUserComponent } from '../user/create-user/create-user.component';
import { UpdateUserComponent } from '../user/update-user/update-user.component';
import { ButtonComponent } from '../button/button.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    CreateUserComponent,
    ButtonComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [UserService, ToasterService],
})
export class HomeComponent {
  /** The view container reference. */
  @ViewChild('viewContainerRef', { static: true, read: ViewContainerRef })
  private viewContainerRef!: ViewContainerRef;

  private unsubscriber$ = new Subject<void>();

  private userFormComponentRef:
    | ComponentRef<CreateUserComponent | UpdateUserComponent>
    | undefined = undefined;

  readonly userTableConfig = [
    {
      definition: 'username',
      name: 'username',
      data: (user: IUser) => user.username,
      action: (user: IUser) => this.openUpdateUserForm(user),
    },
    {
      definition: 'firstName',
      name: 'first name',
      data: (user: IUser) => user.firstName,
      action: (user: IUser) => this.openUpdateUserForm(user),
    },
    {
      definition: 'lastName',
      name: 'last name',
      data: (user: IUser) => user.lastName,
      action: (user: IUser) => this.openUpdateUserForm(user),
    },
    {
      definition: 'email',
      name: 'email',
      data: (user: IUser) => user.email,
      action: (user: IUser) => this.openUpdateUserForm(user),
    },
    {
      definition: 'type',
      name: 'type',
      data: (user: IUser) => user.type,
      action: (user: IUser) => this.openUpdateUserForm(user),
    },
  ];

  tableData$ = this.userService.getAllUsers();

  constructor(
    private userService: UserService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  private openUserForm(componentType: UserComponentType, data?: IUser): Observable<UserEmittedData | null> | null {
    this.viewContainerRef.clear();
    if (componentType === CreateUserComponent) {
      this.userFormComponentRef =
        this.viewContainerRef.createComponent(CreateUserComponent);
    } else if (componentType === UpdateUserComponent && data) {
      this.userFormComponentRef =
        this.viewContainerRef.createComponent(UpdateUserComponent);
      this.userFormComponentRef.setInput('user', data);
    }

    return this.userFormComponentRef ? this.userFormComponentRef.instance.closed$ : null;
  }

  openCreateUserForm(): void {
    this.openUserForm(CreateUserComponent)
      ?.pipe(
        switchMap((data) => {
          if (data && data.type === 'CreateUser') {
            const newUser = { ...data.user };
            return this.userService.createUser(newUser);
          } else {
            this.userFormComponentRef?.destroy();
          }
          return of(null);
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe((response) => {
        if (response) {
          this.toasterService.showSuccess('Success message');
          this.tableData$ = this.userService.getAllUsers();
          this.userFormComponentRef?.destroy();
        }
      });
  }

  openUpdateUserForm(user: IUser): void {
    this.openUserForm(UpdateUserComponent, user)
      ?.pipe(
        switchMap((data) => {
          if (data && data.type === 'UpdateUser') {
            const updatedUser = { ...data.user };
            return this.userService.updateUser(updatedUser.id, updatedUser);
          } else if (data && data.type === 'DeleteUser') {
            return this.userService.deleteUser(data.user.id);
          } else {
            this.userFormComponentRef?.destroy();
          }
          return of(null);
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe((response) => {
        if (response) {
          this.toasterService.showSuccess('Success message');
          this.tableData$ = this.userService.getAllUsers();
          this.userFormComponentRef?.destroy();
        }
      });
  }
}
