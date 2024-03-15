import { Component, Inject } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { TOAST_CONFIG_TOKEN, ToastConfig } from '../../models/toaster.model';
import { ToastRef } from '../../services/toaster-ref';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
})
export class ToasterComponent {
  private intervalId: Subscription | undefined;

  constructor(
    private readonly toastRef: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) {}

  ngOnInit(): void {
    // sets the timer for closing toast
    this.intervalId = timer(5000).subscribe(() => {
      this.close();
    });
  }

  close(): void {
    this.toastRef.close();
  }

  ngOnDestroy(): void {
    this.intervalId?.unsubscribe();
  }
}
