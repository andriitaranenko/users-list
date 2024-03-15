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
  closed$ = this.onClose$.asObservable();
  protected close() {
    this.onClose$.next(null);
  }
  protected form: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }
}
