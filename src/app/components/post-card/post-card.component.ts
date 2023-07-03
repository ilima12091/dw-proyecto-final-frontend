import { Component, Input } from '@angular/core';
import { PostCard } from 'src/app/interfaces/post-card';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  @Input() postCard?: PostCard;
  constructor() {}

  getTimeAgo(): string {
    const now = new Date();
    const postDate = new Date(this.postCard?.timestamp ?? '');

    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h`;
    }

    const days = Math.floor(hours / 24);
    return `${days}d`;
  }
}

export { PostCard };
