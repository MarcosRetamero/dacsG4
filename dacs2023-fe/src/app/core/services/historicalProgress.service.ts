import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

/** Modelo completo que incluye el `id` */
export interface HistoricalProgress {
  id: number;
  date: string;  // Format: YYYY-MM-DD
  progressDescription: string | null;
  weight: number;
  bodyFatPercentage: number | null;
  customerId: string;  // Keycloak user ID
}

/** DTO para creación, sin el `id` */
export type HistoricalProgressCreateDTO = Omit<HistoricalProgress, 'id'>;

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

  /** Método de creación usando el DTO sin `id` */
  createProgress(progress: HistoricalProgressCreateDTO): Observable<HistoricalProgress> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.post<HistoricalProgress>(this.apiUrl, progress, { headers });
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
