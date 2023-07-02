import { Injectable } from '@angular/core';
import { NavBar } from '../interfaces/nav-bar';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  navBar: NavBar = {
    homeIcon: "assets/icons/Home.svg",
    searchIcon: "assets/icons/Search.svg",
    createIcon: "assets/icons/Create.svg",
    chatsIcon: "assets/icons/Chat.svg",
    profileIcon: "assets/icons/Profile.svg"
  };

  getNavBar(): NavBar {
    return this.navBar;
  }
}
