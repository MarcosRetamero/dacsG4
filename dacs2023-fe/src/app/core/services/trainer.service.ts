import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Importa la configuración del entorno

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  // Usa la URL de la base de datos configurada en el archivo de entorno
  private apiUrl = `${environment.databaseUrl}/trainer`; // Se refiere a la API de la base de datos

  constructor(private http: HttpClient) {}

  // Método para obtener los entrenadores
  getTrainers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para agregar un entrenador
  addTrainer(trainerData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, trainerData);
  }

  // Método para obtener un entrenador por ID
  getTrainerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Método para actualizar un entrenador
  updateTrainer(id: number, trainerData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, trainerData);
  }

  // Método para eliminar un entrenador
  deleteTrainer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
