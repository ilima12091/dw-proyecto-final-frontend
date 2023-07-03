import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { SecureService } from '../secure/secure.service';
import { BASE_URL } from 'src/utils/globals';


const secureService = new SecureService();
@Injectable({
  providedIn: 'root',
})


export class UserService {
  
  commonHeaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  };
  url = 'http://localhost:8000';

  constructor() {}

  
  async getUserByUserName(username: string): Promise<User> {
    const result = await secureService.request('GET', `${this.url}/users/${username}`, {}, this.commonHeaders);
  
    if (result.ok) {
      return result;
    } else {
      throw new Error('Failed to retrieve user');
    }
  }
  

  async getUserByUserId(user_id: number): Promise<User> {
    console.log('getUserByUserId called with user_id:', user_id); // Debug statement
  
    const result = await secureService.request('GET', `${BASE_URL}/users/user/${user_id}`, {}, this.commonHeaders);
    console.log('Result from database:', result); // Debug statement
  
    if (result) {
      return result; // Assuming the user data is directly returned as an object
    } else {
      throw new Error('Failed to retrieve user');
    }
  }
  
  
  
  
  
  //doesnt use secure service 
  async createUser(user: User): Promise<boolean> {
    const result = await fetch(`${this.url}/session/register`, {
      method: 'POST',
      headers: this.commonHeaders,
      body: JSON.stringify(user),
    });
    return result.ok;
  }

  async modifyUser(user: User): Promise<boolean> {
    const result = await secureService.request('PUT', `${this.url}/user/${user.username}`, user, this.commonHeaders);
    return result.ok;
  }
  

  async uploadProfileImage(fileData: string, user_id: number | undefined): Promise<any> {
    const formData = new FormData();
    formData.append('file', fileData); // Add the file data to the FormData
  
    const result = await secureService.request('POST', `${this.url}/user/upload/${user_id}`, formData);
    return result;
  }
  
  
  
}
