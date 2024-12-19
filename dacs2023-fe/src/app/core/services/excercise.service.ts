import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Importa la configuración del entorno

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  // Usa la URL de la base de datos configurada en el archivo de entorno
  private apiUrl = `${environment.databaseUrl}/exercise`; // API de la base de datos

  constructor(private http: HttpClient) {}

  // Obtener todos los ejercicios
  getExercises(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener ejercicio por ID
  getExerciseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo ejercicio
  addExercise(exerciseData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, exerciseData);
  }

  // Actualizar ejercicio
  updateExercise(id: number, exerciseData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, exerciseData);
  }

  // Eliminar ejercicio
  deleteExercise(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
