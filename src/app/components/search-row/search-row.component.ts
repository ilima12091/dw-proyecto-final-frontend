import { Component, Input } from '@angular/core';
import { UserSearch } from 'src/app/interfaces/user-search';

@Component({
  selector: 'app-search-row',
  templateUrl: './search-row.component.html',
  styleUrls: ['./search-row.component.css'],
})
export class SearchRowComponent {
  @Input() user!: UserSearch;
}
