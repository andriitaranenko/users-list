import { InjectionToken } from '@angular/core';

export const TOAST_CONFIG_TOKEN = new InjectionToken('TOAST_DATA');

export enum Toasts {
  'ERROR' = 'error',
  'SUCCESS' = 'success',
}

export type ToastType = Toasts.ERROR | Toasts.SUCCESS;

export interface ToastConfig {
  type?: ToastType;
  text?: string;
}
