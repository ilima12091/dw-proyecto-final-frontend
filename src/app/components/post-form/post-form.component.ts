import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts/posts.service';
import { PostCard } from '../post-card/post-card.component';
import { Timestamp } from 'firebase/firestore';




@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  editingMode = false;
  currentPostId!: number;
  currentUser!: PostCard; 

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    const post: PostCard = {
      postId: this.currentPostId,
      userId: this.currentUser.userId,
      userImage: this.currentUser.userImage, 
      content: this.postForm.value.content,
      timeStap: Timestamp.fromMillis(Date.now()),
    };
    
    try {
      if (this.editingMode) {
        await this.postsService.modifyPost(post);
      } else {
        await this.postsService.createPost(post);
      }
      this.postForm.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async editPost(post: PostCard): Promise<void> {
    try {
      await this.postsService.modifyPost(post);
      console.log("La publicación ha sido modificada exitosamente.");
    } catch (error) {
      console.error("Error al modificar la publicación:", error);
    }
  }
  
  async deletePost(): Promise<void> {
    try {
      const post: PostCard = {
        postId: this.currentPostId,
        userId: this.currentUser.userId,
        userImage: this.currentUser.userImage, 
        content: this.postForm.value.content,
        timeStap: Timestamp.fromMillis(Date.now()),
      };
      await this.postsService.deletePost(post);
      console.log("La publicación ha sido eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  }
}