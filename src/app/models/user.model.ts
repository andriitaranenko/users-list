import { Type } from '@angular/core';
import { CreateUserComponent } from '../components/user/create-user/create-user.component';
import { UpdateUserComponent } from '../components/user/update-user/update-user.component';

export enum UserRolres {
  'ADDMIN' = 'ADMIN',
  'DRIVER' = 'DRIVER',
}

export type UserRole = UserRolres.ADDMIN | UserRolres.DRIVER;

export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  type: UserRole;
}

export type UserComponentType =
  | Type<CreateUserComponent>
  | Type<UpdateUserComponent>;

export type UserComponentAction = 'CreateUser' | 'UpdateUser' | 'DeleteUser';

export interface UserEmittedData {
  type: UserComponentAction;
  user: IUser;
}
