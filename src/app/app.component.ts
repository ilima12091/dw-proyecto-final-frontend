import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  showNavBar() {
    const routesWithoutNav = ['/login', '/register'];

    return !routesWithoutNav.includes(this.router.url);
  }
}
