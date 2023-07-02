import { Injectable } from '@angular/core';
import { clearSession } from 'src/utils/sessionValidation';

@Injectable({
  providedIn: 'root',
})
export class SecureService {
  constructor() {}

  async request(
    method: string,
    url: string,
    body: any = {},
    headers: any = {}
  ): Promise<any> {
    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (Object.keys(body).length > 0) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    const parsedResponse = await response.json();

    if (response.ok) return parsedResponse;

    if (response.status === 401) {
      clearSession();
    }

    throw new Error(parsedResponse.message);
  }
}
