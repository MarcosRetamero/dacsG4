import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

// Define la interfaz de Exercise
export interface Exercise {
  id: number;
  routineId: number;  // ID de la rutina a la que pertenece
  name: string;
  image: string;
  description: string;
  reps: number;
  sets: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'http://localhost:9001/bff/backend/exercises'; // Reemplaza con tu endpoint
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Obtiene el token de autenticación
    this.authService.getToken().subscribe((token: string | null) => {
      this.token = token;
    });
  }

  // Obtener todos los ejercicios de una rutina
  getExercisesByRoutineId(routineId: number): Observable<Exercise[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<Exercise[]>(`${this.apiUrl}/routine/${routineId}`, { headers });
  }

  // Obtener un ejercicio por su ID
  getExerciseById(id: number): Observable<Exercise> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<Exercise>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear un nuevo ejercicio
  createExercise(exercise: Exercise): Observable<Exercise> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Exercise>(this.apiUrl, exercise, { headers });
  }

  // Actualizar un ejercicio existente
  updateExercise(id: number, exercise: Exercise): Observable<Exercise> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<Exercise>(`${this.apiUrl}/${id}`, exercise, { headers });
  }

  // Eliminar un ejercicio por su ID
  deleteExercise(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
