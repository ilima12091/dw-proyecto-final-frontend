import { Component, Input } from '@angular/core';
import { PostCard } from 'src/app/interfaces/post-card';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  errorLoadingPosts = false;
  loadingPosts = true;
  postCards: PostCard[] = [];

  constructor(private postService: PostsService) {
    this.postService
      .getPostCards()
      .then((data) => {
        this.postCards = data;
      })
      .catch((_) => {
        this.errorLoadingPosts = true;
      })
      .finally(() => {
        this.loadingPosts = false;
      });
  }
}
