import { Injectable } from '@angular/core';
import { PostCard } from '../interfaces/post-card';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor() { }

  postCards: PostCard[] = [
    {
      id: 1,
      userImage: "https://www.nobbot.com/wp-content/uploads/2021/12/perfil-1024x754.jpg",
      userName: "Pepe",
      postText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae eleifend elit, sed congue justo. Cras ullamcorper ut purus sagittis vulputate. Nam aliquet nibh et purus ultrices, quis pharetra diam.",
      time: "19:28"
    },
    {
      id: 2,
      userImage: "",
      userName: "Pedro",
      postText: "texto 2",
      time: "19:39"
    }
  ];

  getPostCards(): PostCard[] {
    return this.postCards;
  }
}
