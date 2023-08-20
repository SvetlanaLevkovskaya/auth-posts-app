import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationService } from '../../shared/services/notification.service';

export const notAuthGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const isLoggedIn: boolean = userService.isLoggedIn();
  if (isLoggedIn) {
    notificationService.handleSuccess('You`re already signed in!');
    router.navigate(['/posts']).then(r => r);
  }
  return isLoggedIn;
};
