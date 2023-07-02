import { Component } from '@angular/core';
import { UserSearch } from 'src/app/interfaces/user-search';
import { UserService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm!: string;
  typingTimer: any;
  typingDelay: number = 500;
  searchResults: UserSearch[] = [];
  loading: boolean = false;
  errorLoading: boolean = false;

  constructor(private usersService: UserService) {
    this.loading = false;
  }

  onSearchKeyup() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.search();
    }, this.typingDelay);
  }

  search() {
    if (this.searchTerm) {
      this.loading = true;
      this.usersService
        .searchUsers(this.searchTerm)
        .then((users) => {
          this.searchResults = users;
          this.errorLoading = false;
        })
        .catch((_) => {
          this.errorLoading = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
