import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notify } from '../interfaces/notify.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notify$ = new BehaviorSubject<Notify | null>(null);
  private readonly notificationTimeout = 3000;

  private addNotification(severity: 'success' | 'error', message: string) {
    this.notify$.next({ severity, message });

    setTimeout(() => {
      const currentNotification = this.notify$.getValue();
      if (currentNotification?.message === message) {
        this.clear();
      }
    }, this.notificationTimeout);
  }

  handleError(message: string) {
    this.addNotification('error', message);
  }

  handleSuccess(message: string) {
    this.addNotification('success', message);
  }

  clear() {
    this.notify$.next(null);
  }
}
