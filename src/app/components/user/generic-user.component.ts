import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

import { UserEmittedData } from '../../models/user.model';

@Component({
  selector: 'app-generic-user',
  standalone: true,
  imports: [],
  template: '',
})
export class GenericUserComponent {
  protected readonly userFormControlKey: string = '';

  protected onClose$ = new Subject<UserEmittedData | null>();

  protected form: FormGroup = new FormGroup({});

  closed$ = this.onClose$.asObservable();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  protected close(): void {
    this.onClose$.next(null);
  }
}
