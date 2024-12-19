import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Importa la configuración del entorno

@Injectable({
  providedIn: 'root',
})
export class ExerciseRoutineService {
  // Usa la URL de la base de datos configurada en el archivo de entorno
  private apiUrl = `${environment.databaseUrl}/exercise_routine`; // API de la base de datos

  constructor(private http: HttpClient) {}

  // Obtener todas las rutinas de ejercicios
  getExerciseRoutines(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener rutina de ejercicio por ID
  getExerciseRoutineById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva rutina de ejercicio
  addExerciseRoutine(exerciseRoutineData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, exerciseRoutineData);
  }

  // Actualizar rutina de ejercicio
  updateExerciseRoutine(id: number, exerciseRoutineData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, exerciseRoutineData);
  }

  // Eliminar rutina de ejercicio
  deleteExerciseRoutine(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
