import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { SearchComponent } from './views/search/search.component';
import { ProfileComponent } from './views/profile/profile.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarItemsComponent } from './components/nav-bar/nav-bar-items/nav-bar-items.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    ProfileComponent,
    PostCardComponent,
    NavBarComponent,
    NavBarItemsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
