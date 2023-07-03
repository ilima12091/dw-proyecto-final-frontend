import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css'],
})
export class PostCreationComponent {
  postCreationForm = new FormGroup({
    content: new FormControl(''),
  });
  errorCreating = false;
  createdSuccessfully = false;

  constructor(private postsService: PostsService) {}

  createPost() {
    const { content } = this.postCreationForm.value;
    this.postsService
      .createPost(content ?? '')
      .then(() => {
        this.showCreatedSuccessfully();
        this.postCreationForm.reset();
      })
      .catch(() => {
        this.showErrorCreating();
      });
  }

  showErrorCreating() {
    this.errorCreating = true;
    setTimeout(() => {
      this.errorCreating = false;
    }, 3000);
  }

  showCreatedSuccessfully() {
    this.createdSuccessfully = true;
    setTimeout(() => {
      this.createdSuccessfully = false;
    }, 3000);
  }
}
