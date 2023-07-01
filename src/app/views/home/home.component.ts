import { Component, Input } from '@angular/core';
import { PostCard } from 'src/app/interfaces/post-card';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  postCards: PostCard[] = [];

  constructor(private postService: PostService) {
    this.postService.getPostCards().then((data) => {
      this.postCards = data;
    });
  }
}
