// bdd.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BddResponse } from '../models/bdd.model';  // Asegúrate de importar el modelo correctamente

@Injectable({
  providedIn: 'root'
})
export class BddService {

  private apiUrl = 'http://localhost:9001/bff/backend/customer';  // Reemplaza con tu endpoint

  constructor(private http: HttpClient) { }

  getBddData(): Observable<BddResponse> {
    return this.http.get<BddResponse>(this.apiUrl);
  }
}
