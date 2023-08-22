import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interfasec';
import { LoginRequestDto } from '../../interfaces/login.intefaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,5}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.authService.authState.subscribe(async (user: User | null) => {
      if (user) {
        this.userService.setLoggedIn({
          email: user.email,
          provider: user.provider,
        });
        await this.router.navigate(['/posts']);
      }
    });
  }

  async onLoginSubmit() {
    if (this.loginForm.valid) {
      const { email }: LoginRequestDto = this.loginForm.value;
      this.userService.setLoggedIn({ email });
      await this.router.navigate(['/posts']);
    }
  }
}
