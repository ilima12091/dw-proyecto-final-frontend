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
}
