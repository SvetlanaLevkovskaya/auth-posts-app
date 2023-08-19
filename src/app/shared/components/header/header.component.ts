import { Component } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  get userEmail(): string | undefined {
    return this.userService.getUser()?.email;
  }

  logout(): void {
    this.userService.setLoggedOut();
  }
}
