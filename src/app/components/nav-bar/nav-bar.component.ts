import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { navBarItems } from 'src/app/utils/nav-bar-items';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  navBarItems = navBarItems;

  constructor(private authenticationService: AuthenticationService) {}

  logout() {
    this.authenticationService
      .logout()
      .then(() => {
        window.location.replace('/login');
      })
      .catch((error) => {
        console.error('Error logging out', error);
      });
  }
}
