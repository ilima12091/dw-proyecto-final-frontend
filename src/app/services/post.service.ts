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
}
