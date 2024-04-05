import {ChangeDetectorRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  message = ''
  statusMessage: 'success' | 'error' = 'success';
  constructor() { }
  showToast(message: string, status: 'success' | 'error') {
    this.message = message;
    this.statusMessage = status;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
