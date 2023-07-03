import { Component } from '@angular/core';
import { PostCard } from 'src/app/interfaces/post-card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  post?: PostCard;
  loadingPost = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    this.loadingPost = true;
    this.postsService
      .getSpecificPost(parseInt(id ?? '') || 0)
      .then((data) => {
        console.log(data);
        data.comments = JSON.parse(data?.comments ?? '[]');
        this.post = data;
      })
      .finally(() => {
        this.loadingPost = false;
      });
  }
}
