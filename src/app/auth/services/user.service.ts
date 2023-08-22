import { Injectable } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { User } from '../interfaces/user.interfasec';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private authService: SocialAuthService
  ) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('email');

    if (isLoggedIn === 'true' && userEmail) {
      this.user = {
        email: userEmail,
      };
    }
  }

  getUser(): User | null {
    return this.user;
  }

  setLoggedIn(user: User): void {
    this.user = user;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', user.email);
    this.handleSuccessLogin();
  }

  async setLoggedOut(): Promise<void> {
    const user = this.getUser();

    if (user && user.provider === 'GOOGLE') {
      try {
        await this.authService.signOut();
        this.handleSuccessLogout(user.email);
      } catch (error) {
        console.error('Error occurred during sign out:', error);
      }
    } else {
      this.handleSuccessLogout(this.user?.email);
    }

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private handleSuccessLogin(): void {
    this.notificationService.handleSuccess(
      `User ${this.user?.email} successfully signed in!`
    );
  }

  private handleSuccessLogout(email: string | undefined): void {
    const userEmail = localStorage.getItem('email');

    this.router.navigate(['/login']);
    this.notificationService.handleSuccess(
      `User ${email ? email : userEmail} successfully signed out!`
    );
  }
}
