import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts/posts.service';
import { PostCard } from '../post-card/post-card.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/authentication/authentication.service'; // Importa el servicio de autenticación
import { User } from 'src/app/interfaces/user';



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
      userId: this.currentUser.userId, // Utiliza el ID de usuario del usuario actualmente autenticado
      userImage: this.currentUser.userImage, // Utiliza la imagen del usuario actualmente autenticado si está disponible
      content: this.postForm.value.content,
      timeStap: Date.now()
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

  async editPost(postId: number) {
    try {
      const post = await this.postsService.getSpecificPost(postId);
      this.editingMode = true;
      this.currentPostId = postId;
      this.postForm.patchValue({
        content: post.content
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deletePost(post: PostCard) {
    try {
      await this.postsService.deletePost(post);
    } catch (error) {
      console.error(error);
    }
  }
}
