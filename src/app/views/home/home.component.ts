import { Component, Input } from '@angular/core';
import { PostCardComponent } from 'src/app/components/post-card/post-card.component';
import { PostCard } from "src/app/interfaces/post-card"
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  postCards: PostCard[] = [];

  constructor(private homeService: HomeService) {
    this.postCards = this.homeService.getPostCards();
  }
}
