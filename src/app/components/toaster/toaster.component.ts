import { Component, Inject } from '@angular/core';
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
  private intervalId!: number | ReturnType<typeof setTimeout>;


  constructor(
    private readonly toastRef: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) {}

  ngOnInit() {
    // sets the timer for closing toast
    this.intervalId = setTimeout(() => this.close(), 5000);
  }

  close() {
    this.toastRef.close();
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }
}
