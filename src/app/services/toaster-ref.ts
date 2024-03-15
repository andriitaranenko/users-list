import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
  constructor(private readonly overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}
