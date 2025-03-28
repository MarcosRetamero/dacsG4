import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

// Update the interface to match the API response
export interface HistoricalProgress {
  id: number;
  date: string;  // Format: YYYY-MM-DD
  progressDescription: string | null;
  weight: number;
  bodyFatPercentage: number | null;
  customerId: string;  // Keycloak user ID
}

@Injectable({
  providedIn: 'root'
})
export class HistoricalProgressService {
  private apiUrl = 'http://localhost:9001/bff/backend/historical-progress';
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getToken().subscribe((token: string | null) => {
      this.token = token;
    });
  }

  // Update the endpoint to match the API
  getProgressByUserId(customerId: string): Observable<HistoricalProgress[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<HistoricalProgress[]>(`${this.apiUrl}/customer/${customerId}`, { headers });
  }

  createProgress(customerId: string, data: Pick<HistoricalProgress, 'date' | 'weight'>): Observable<HistoricalProgress[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<HistoricalProgress[]>(
      `${this.apiUrl}/customer/${customerId}`,
      data,
      { headers }
    );
  }

  deleteProgress(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
