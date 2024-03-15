import { InjectionToken } from '@angular/core';

export const TOAST_CONFIG_TOKEN = new InjectionToken('TOAST_DATA');

export type ToastType = 'error' | 'success';

export interface ToastConfig {
  type?: ToastType;

  text?: string;
}
