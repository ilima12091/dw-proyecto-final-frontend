import { Component, Input } from '@angular/core';
import { PostCard } from 'src/app/interfaces/post-card';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() postCard!: PostCard;
}
