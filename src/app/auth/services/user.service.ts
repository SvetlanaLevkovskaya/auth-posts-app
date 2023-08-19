import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: SocialUser | null = null;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private authService: SocialAuthService
  ) {}

  getUser(): SocialUser | null {
    return this.user;
  }

  setLoggedIn(user: SocialUser): void {
    this.user = user;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', user.email);
    this.handleSuccessLogin();
  }

  setLoggedOut(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');

    this.authService.authState.pipe(take(1)).subscribe(user => {
      if (user) {
        this.authService
          .signOut()
          .then(() => {
            this.handleSuccessLogout();
          })
          .catch(error => {
            console.error('Error occurred during sign out:', error);
            this.handleSuccessLogout();
          });
      } else {
        this.handleSuccessLogout();
      }
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private handleSuccessLogin(): void {
    this.notificationService.handleSuccess(
      `User ${this.user?.email} successfully signed in!`
    );
  }

  private handleSuccessLogout(): void {
    this.router.navigate(['/login']);
    this.notificationService.handleSuccess(
      `User ${this.user?.email} successfully logged out!`
    );
  }
}
