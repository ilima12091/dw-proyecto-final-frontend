import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { SearchComponent } from './views/search/search.component';
import { ProfileComponent } from './views/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePictureComponent } from './views/profile/profile-picture/profile-picture.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PostComponent } from './views/post/post.component';
import { NavBarItemComponent } from './components/nav-bar-item/nav-bar-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    ProfileComponent,
    ProfilePictureComponent,
    PostCardComponent,
    NavBarComponent,
    PostComponent,
    NavBarItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
