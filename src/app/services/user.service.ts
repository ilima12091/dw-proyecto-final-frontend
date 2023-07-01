import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  commonHeaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  };
  url = 'http://localhost:8000';

  constructor() { }

  async getUsers(): Promise<User[]> {
    return (await (await fetch(`${this.url}/users`)).json()) ?? [];
  }

  async getUserByUserName(username: string): Promise<User> {
    const result = await fetch(`${this.url}/user/${username}`, {
      method: 'GET',
      headers: this.commonHeaders,
    });
  
    if (result.ok) {
      const user = await result.json();
      return user;
    } else {
      throw new Error('Failed to retrieve user');
    }
  }
  
  async createUser(user: User): Promise<boolean> {
    const result= await fetch(`${this.url}/user/register`,{
      method: 'POST',
      headers:this.commonHeaders,
      body:JSON.stringify(user),
    });
    return result.ok;
  }

  async modifyUser(user: User): Promise<boolean> {
    const result= await fetch('${this.url}/user/${user.username}',{
      method: 'PUT',
      headers:this.commonHeaders,
      body:JSON.stringify(user),
    });
    return result.ok;
  }

  async uploadProfileImage(formData: FormData): Promise<any> {
    return fetch(`${this.url}/user/upload`, {
      method: 'POST',
      body: formData,
    }).then(response => response.json());
  
  }
  
}
