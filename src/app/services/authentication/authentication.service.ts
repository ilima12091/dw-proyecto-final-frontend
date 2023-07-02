import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/interfaces/user-login';
import { BASE_URL, COMMON_HEADERS } from 'src/utils/globals';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  async login(userLogin: UserLogin): Promise<any> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(userLogin),
      headers: COMMON_HEADERS,
      credentials: 'include',
    });

    const parsedResponse = await response.json();

    return parsedResponse;
  }
}
