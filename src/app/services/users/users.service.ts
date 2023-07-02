import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { SecureService } from '../secure/secure.service';
import { UserSearch } from 'src/app/interfaces/user-search';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  commonHeaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  };
  url = 'http://localhost:8000';

  constructor(private secureService: SecureService) {}

  async getUsers(): Promise<User[]> {
    return (await (await fetch(`${this.url}/users`)).json()) ?? [];
  }

  async createUser(user: User): Promise<boolean> {
    const result = await fetch(`${this.url}/session/register`, {
      method: 'POST',
      headers: this.commonHeaders,
      body: JSON.stringify(user),
    });
    return result.ok;
  }

  async modifyUser(user: User): Promise<boolean> {
    const result = await fetch('${this.url}/user/${user.username}', {
      method: 'PUT',
      headers: this.commonHeaders,
      body: JSON.stringify(user),
    });
    return result.ok;
  }

  async searchUsers(searchTerm: string): Promise<UserSearch[]> {
    return this.secureService.request(
      'GET',
      `${this.url}/users/search?username=${searchTerm}`
    );
  }
}
