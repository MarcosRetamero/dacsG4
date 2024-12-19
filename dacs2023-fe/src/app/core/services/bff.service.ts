import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BffService {
  private apiUrl = 'http://localhost:9001/bff/conector/exercises/with-images';
  private token = 'eyJhbGci...'; // Token manual para pruebas

  constructor(private http: HttpClient) {}

  // Método para obtener datos desde el BFF
  getDatos(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    console.log('Realizando solicitud a:', this.apiUrl);
    console.log('Encabezados de la solicitud:', headers);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
