import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';

export const notAuthGuard = async () => {
  const userService = inject(UserService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const isLoggedIn: boolean = userService.isLoggedIn();
  if (isLoggedIn) {
    notificationService.handleSuccess('You`re already signed in!');
    await router.navigate(['/posts']);
    return false;
  }
  return !isLoggedIn;
};
