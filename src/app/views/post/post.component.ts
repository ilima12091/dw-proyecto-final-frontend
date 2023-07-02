import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { PostCard } from 'src/app/interfaces/post-card';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  post?: PostCard;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
    let id = this.route.snapshot.paramMap.get('id');

    this.postsService.getSpecificPost(parseInt(id ?? '') || 0).then((data) => {
      this.post = data;
    });
  }
}
