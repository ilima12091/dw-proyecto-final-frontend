import { Component, Input } from '@angular/core';
import { UserSearch } from 'src/app/interfaces/user-search';
import { UserService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-search-row',
  templateUrl: './search-row.component.html',
  styleUrls: ['./search-row.component.css'],
})
export class SearchRowComponent {
  @Input() user!: UserSearch;

  constructor(private usersService: UserService) {}

  follow(userId: number) {
    this.usersService.followUser(userId).then((_) => {
      this.user.following = 1;
    });
  }

  unFollow(userId: number) {
    this.usersService.unFollowUser(userId).then((_) => {
      this.user.following = 0;
    });
  }

  isFollowed() {
    return this.user.following === 1;
  }
}
