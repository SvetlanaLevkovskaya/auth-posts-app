import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isLoggedIn: boolean = userService.isLoggedIn();
  if (!isLoggedIn) {
    router.navigate(['/login']).then(r => r);
  }
  return isLoggedIn;
};
