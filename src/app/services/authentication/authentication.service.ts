import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/interfaces/user-login';
import { BASE_URL, COMMON_HEADERS } from 'src/utils/globals';
import { SecureService } from '../secure/secure.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private secureService: SecureService) {}

  async login(userLogin: UserLogin): Promise<any> {
    const response = await fetch(`${BASE_URL}/session/login`, {
      method: 'POST',
      body: JSON.stringify(userLogin),
      headers: COMMON_HEADERS,
      credentials: 'include',
    });

    const parsedResponse = await response.json();

    if (response.ok) return parsedResponse;

    throw new Error(parsedResponse.message);
  }

  async logout(): Promise<void> {
    this.secureService.request('POST', `${BASE_URL}/session/logout`);
  }
}
