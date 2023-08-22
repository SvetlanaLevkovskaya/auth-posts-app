import { Component } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  get userEmail(): string | null {
    return localStorage.getItem('email');
  }

  isLoggedIn(): boolean {
    return !!this.userEmail;
  }

  getUsernameDisplay(): string {
    const userEmail = this.userEmail;
    return userEmail ? `Welcome, ${userEmail}!` : '';
  }

  logout(): void {
    this.userService.setLoggedOut();
  }
}
