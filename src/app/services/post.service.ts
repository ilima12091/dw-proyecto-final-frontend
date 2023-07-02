import { Injectable } from '@angular/core';
import { PostCard } from '../interfaces/post-card';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  backendUrl = 'http://localhost:8000';
  
  constructor() { }

  async getPostCards(): Promise<PostCard[]> {
    return (await (await fetch(`${this.backendUrl}/home`)).json()) ?? [];
  }

  async getSpecificPost(id: number): Promise<PostCard> {
    return (await (await fetch(`${this.backendUrl}/home/${id}`)).json()) ?? [];
  }

  async createPost(post: PostCard): Promise<PostCard> {
    const response = await fetch(`${this.backendUrl}/${post.userId}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
  
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error creating post');
    }
  }

  async modifyPost(post: PostCard): Promise<PostCard> {
    const response = await fetch(`${this.backendUrl}/${post.userId}/posts/${post.postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
  
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error updating post');
    }
  }

  async deletePost(post: PostCard): Promise<void> {
    const response = await fetch(`${this.backendUrl}/${post.userId}/posts/${post.postId}`, {
      method: 'DELETE'
    });
  
    if (!response.ok) {
      throw new Error('Error deleting post');
    }
  }  
}
