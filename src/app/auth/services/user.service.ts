import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: SocialUser | null = null;

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
        provider: '',
        id: '',
        name: '',
        photoUrl: '',
        firstName: '',
        lastName: '',
        authToken: '',
        idToken: '',
        authorizationCode: '',
        response: '',
      };
    }
  }

  getUser(): SocialUser | null {
    return this.user;
  }

  setLoggedIn(user: SocialUser): void {
    this.user = user;
    console.log('user', user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', user.email);
    this.handleSuccessLogin();
  }

  setLoggedOut(): void {
    const user = this.getUser();
    console.log('user', user);

    if (user && user.provider === 'GOOGLE') {
      this.authService
        .signOut()
        .then(() => {
          console.log('User GOOGLE is not logged out.');
          this.handleSuccessLogout(user.email);
        })
        .catch(error => {
          console.error('Error occurred during sign out:', error);
          this.handleSuccessLogout(user.email);
        });
    } else {
      console.log('User is not logged in.');
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
