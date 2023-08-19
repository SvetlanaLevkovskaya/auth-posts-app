import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: SocialUser | null = null;

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  setUser(user: SocialUser | null) {
    this.user = user;
  }

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
    this.handleSuccessLogout();
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
