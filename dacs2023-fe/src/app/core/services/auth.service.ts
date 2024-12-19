
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9001/bff/backend/usuarios/email'; //no se que va aca

  constructor(private http: HttpClient) {}

  getUserRole(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${email}`);
  }
}
