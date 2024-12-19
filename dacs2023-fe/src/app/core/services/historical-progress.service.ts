import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Importa la configuración del entorno

@Injectable({
  providedIn: 'root',
})
export class HistoricalProgressService {
  // Usa la URL de la base de datos configurada en el archivo de entorno
  private apiUrl = `${environment.databaseUrl}/historical_progress`; // API de la base de datos

  constructor(private http: HttpClient) {}

  // Obtener todos los progresos históricos
  getHistoricalProgress(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener progreso histórico por ID
  getHistoricalProgressById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo progreso histórico
  addHistoricalProgress(progressData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, progressData);
  }

  // Actualizar progreso histórico
  updateHistoricalProgress(id: number, progressData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, progressData);
  }

  // Eliminar progreso histórico
  deleteHistoricalProgress(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
