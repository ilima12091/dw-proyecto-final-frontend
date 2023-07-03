import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showLoginError = false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  performLogin() {
    const { email, password } = this.loginForm.value;
    this.authenticationService
      .login({
        email: email ?? '',
        password: password ?? '',
      })
      .then((result) => {
        this.showLoginError = false;
        if (result) {
          localStorage.setItem('SESSION-EXPIRATION', result?.sessionExpiration);
          localStorage.setItem('USERID', result?.userId);
          this.router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.showLoginError = true;
      });
  }
}
