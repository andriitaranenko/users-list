import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { IUser, UserRolres } from '../models/user.model';
import { ToasterService } from './toaster.service';

@Injectable()
export class UserService {
  private users: IUser[] = [
    {
      id: 0,
      username: 'dron',
      firstName: 'Andrii',
      lastName: 'Taranenko',
      email: 'dron@email.com',
      type: UserRolres.DRIVER,
    },
    {
      id: 1,
      username: 'dron1',
      firstName: 'Andrii1',
      lastName: 'Taranenko1',
      email: 'dron1@email.com',
      type: UserRolres.ADDMIN,
    },
    {
      id: 2,
      username: 'dron2',
      firstName: 'Andrii2',
      lastName: 'Taranenko2',
      email: 'dron2@email.com',
      type: UserRolres.DRIVER,
    },
    {
      id: 3,
      username: 'dron3',
      firstName: 'Andrii3',
      lastName: 'Taranenko3',
      email: 'dron3@email.com',
      type: UserRolres.DRIVER,
    },
  ];

  constructor(private toasterService: ToasterService) {}

  getAllUsers(): Observable<IUser[]> {
    return of(this.users);
  }

  isUsernameUnique(username: string): Observable<boolean> {
    return of(this.users.map((user) => user.username).includes(username));
  }

  createUser(user: IUser): Observable<IUser> {
    this.users.push({
      ...user,
      id: Number(new Date()),
    });
    return of(user).pipe(
      catchError((error) => this.handleUserRequestError(error))
    );
  }

  updateUser(id: number, updatedUser: IUser): Observable<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);
    this.users.push({ ...updatedUser, id: Number(new Date()) });
    return of(updatedUser).pipe(
      catchError((error) => this.handleUserRequestError(error))
    );
  }

  deleteUser(id: number): Observable<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return of(deletedUser).pipe(
      catchError((error) => this.handleUserRequestError(error))
    );
  }

  private handleUserRequestError(error: HttpErrorResponse): Observable<never> {
    this.toasterService.showError('Error message');
    return throwError(() => error);
  }
}
