import { Injectable } from '@angular/core';
import { PostCard } from '../../interfaces/post-card';
import { SecureService } from '../secure/secure.service';
import { BASE_URL } from 'src/utils/globals';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private secureService: SecureService) {}

  async getPostCards(userId: number): Promise<PostCard[]> {
    return this.secureService.request(
      'GET',
      `${BASE_URL}/users/${userId}/posts`
    );
  }

  async getSpecificPost(postId: number): Promise<PostCard> {
    return this.secureService.request('GET', `${BASE_URL}/posts/${postId}`);
  }
  
  async createPost(post: PostCard): Promise<PostCard> {
    const response = await this.secureService.request('POST', `${BASE_URL}/users/${post.userId}/posts`, {
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
    const response = await this.secureService.request('PUT', `${BASE_URL}/users/${post.userId}/posts/${post.postId}`, {
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
    const response = await this.secureService.request('DELETE', `${BASE_URL}/users/${post.userId}/posts/${post.postId}`);

    if (!response.ok) {
      throw new Error('Error deleting post');
    }
  }
}