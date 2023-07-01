import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  performLogin() {
    const { email, password } = this.loginForm.value;
    this.authenticationService
      .login({
        email: email ?? '',
        password: password ?? '',
      })
      .then((result) => {
        if (result) {
          localStorage.setItem('SESSION-EXPIRATION', result?.sessionExpiration);
          this.router.navigate(['/home']);
        }
      });
  }
}
