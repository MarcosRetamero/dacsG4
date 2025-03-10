import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

// Define la interfaz de HistoricalProgress
export interface HistoricalProgress {
  id: number;
  userId: string;  // ID de usuario como string (Keycloak)
  date: string;  // Fecha en formato string (YYYY-MM-DD)
  weight: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistoricalProgressService {
  private apiUrl = 'http://localhost:9001/bff/backend/historical-progress'; // Reemplaza con tu endpoint
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Obtiene el token de autenticación
    this.authService.getToken().subscribe((token: string | null) => {
      this.token = token;
    });
  }

  // Obtener el progreso histórico de un usuario
  getProgressByUserId(userId: string): Observable<HistoricalProgress[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<HistoricalProgress[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  // Crear un nuevo registro de progreso histórico
  createProgress(progress: HistoricalProgress): Observable<HistoricalProgress> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<HistoricalProgress>(this.apiUrl, progress, { headers });
  }

  // Eliminar un registro de progreso histórico por su ID
  deleteProgress(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
