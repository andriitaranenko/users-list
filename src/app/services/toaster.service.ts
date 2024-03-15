import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { ToastType, TOAST_CONFIG_TOKEN } from '../models/toaster.model';
import { ToastRef } from './toaster-ref';
import { ToasterComponent } from '../components/toaster/toaster.component';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  private showMessage(type: ToastType, text: string): ToastRef {
    const positionStrategy = this.overlay.position().global();

    const overlayRef = this.overlay.create({ positionStrategy });

    const toastRef = new ToastRef(overlayRef);
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: ToastRef, useValue: toastRef },
        { provide: TOAST_CONFIG_TOKEN, useValue: { type, text } },
      ],
    });

    const portal = new ComponentPortal(ToasterComponent, null, injector);
    overlayRef.attach(portal);

    return toastRef;
  }

  showSuccess(text: string): ToastRef {
    return this.showMessage('success', text);
  }

  showError(text: string): ToastRef {
    return this.showMessage('error', text);
  }
}
