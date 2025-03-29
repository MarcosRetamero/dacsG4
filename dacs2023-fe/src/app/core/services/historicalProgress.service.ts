import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProgressByUserId(customerId: string): Observable<HistoricalProgress[]> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<HistoricalProgress[]>(`${this.apiUrl}/customer/${customerId}`, { headers });
      })
    );
  }

  createProgress(customerId: string, data: Pick<HistoricalProgress, 'date' | 'weight'>): Observable<HistoricalProgress[]> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.post<HistoricalProgress[]>(`${this.apiUrl}/customer/${customerId}`, data, { headers });
      })
    );
  }

  deleteProgress(id: number): Observable<void> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
      })
    );
  }
}
