import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
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

  user: SocialUser = new SocialUser();
  loggedIn = false;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        this.userService.setLoggedIn({
          email: user.email,
          provider: user.provider,
          id: '',
          name: '',
          photoUrl: '',
          firstName: '',
          lastName: '',
          authToken: '',
          idToken: '',
          authorizationCode: '',
          response: '',
        });
        this.router.navigate(['/posts']).then(r => r);
      }
    });
  }

  onLoginSubmit() {
    const value = this.loginForm.value;
    if (value) {
      this.userService.setLoggedIn({
        email: value.email,
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
      });
      this.router.navigate(['/posts']).then(r => r);
    }
  }
}
