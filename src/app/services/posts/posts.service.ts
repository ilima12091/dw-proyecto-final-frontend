import { Injectable } from '@angular/core';
import { PostCard } from '../../interfaces/post-card';
import { SecureService } from '../secure/secure.service';
import { BASE_URL } from 'src/utils/globals';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private secureService: SecureService) {}

  async getPostCards(): Promise<PostCard[]> {
    return this.secureService.request('GET', `${BASE_URL}/users/posts/feed`);
  }

  async getSpecificPost(post_id: number): Promise<any> {
    return this.secureService.request('GET', `${BASE_URL}/posts/${post_id}`);
  }

  async createPost(content: string): Promise<any> {
    console.log(content);
    return this.secureService.request(
      'POST',
      `${BASE_URL}/users/posts`,
      {
        content,
      },
      {
        'Content-Type': 'application/json',
      }
    );
  }

  async modifyPost(post: PostCard): Promise<PostCard> {
    const response = await this.secureService.request(
      'PUT',
      `${BASE_URL}/users/${post.user_id}/posts/${post.post_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error updating post');
    }
  }

  async deletePost(post: PostCard): Promise<void> {
    const response = await this.secureService.request(
      'DELETE',
      `${BASE_URL}/users/${post.user_id}/posts/${post.post_id}`
    );

    if (!response.ok) {
      throw new Error('Error deleting post');
    }
  }
}
