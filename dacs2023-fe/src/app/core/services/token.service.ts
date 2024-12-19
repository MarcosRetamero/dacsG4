import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'authToken';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem(this.tokenKey);
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
  }
}
