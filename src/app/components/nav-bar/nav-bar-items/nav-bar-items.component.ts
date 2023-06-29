import { Component } from '@angular/core';
import { NavBar } from 'src/app/interfaces/nav-bar';
import { NavbarService } from 'src/app/services/navbar.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-nav-bar-items',
  templateUrl: './nav-bar-items.component.html',
  styleUrls: ['./nav-bar-items.component.css']
})
export class NavBarItemsComponent {
  
  navBar: NavBar;

  constructor(private navBarService: NavbarService) {
    this.navBar = this.navBarService.getNavBar();
  }

  faPlus = faPlus;
}
