import { Component } from '@angular/core';
import { navBarItems } from 'src/app/utils/nav-bar-items';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  navBarItems = navBarItems;
}
