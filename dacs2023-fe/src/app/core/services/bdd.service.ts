import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BddResponse } from '../models/bdd.model';  // Asegúrate de importar el modelo correctamente
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BddService {

  private apiUrl = 'http://localhost:9001/bff/backend/customer';  // Reemplaza con tu endpoint
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getToken().subscribe(token => {
      this.token = token;
    });
  }


  getBddData(): Observable<BddResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<BddResponse>(this.apiUrl, { headers });
  }
}
