import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Exercise {
  id: number;
  routineId: number;
  name: string;
  image: string;
  description: string;
  reps: number;
  sets: number;
}

export interface Routine {
  id: number;
  userId: string;
  routineName: string;
  day: number;
}

export interface ExerciseImage {
  exercise: {
    id: number;
    name: string;
    description: string;
    exercise_base: number;
  };
  image: {
    id: number;
    image: string;
    exercise_base: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private routineApiUrl = 'http://localhost:9001/bff/backend/routines';
  private exerciseApiUrl = 'http://localhost:9001/bff/backend/exercises';
  private exerciseImagesApiUrl =
    'http://localhost:9001/bff/conector/exercises/with-images';
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getToken().subscribe((token: string | null) => {
      this.token = token;
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  /** OBTENER EJERCICIOS DISPONIBLES CON IMÁGENES */
  getAvailableExercises(): Observable<ExerciseImage[]> {
    return this.http.get<ExerciseImage[]>(this.exerciseImagesApiUrl);
  }

  /** RUTINAS */
  getRoutinesByUserId(userId: string): Observable<Routine[]> {
    // Suponiendo que 'userId' es necesario para recuperar las rutinas asociadas al usuario,
    // pero si solo se necesita 'routineId' como el endpoint backend, ajustamos la llamada.
    return this.http.get<Routine[]>(`${this.routineApiUrl}`, {
      headers: this.getHeaders(),
    });
  }

  getRoutineById(id: number): Observable<Routine> {
    return this.http.get<Routine>(`${this.routineApiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createRoutine(routine: Routine): Observable<Routine> {
    return this.http.post<Routine>(this.routineApiUrl, routine, {
      headers: this.getHeaders(),
    });
  }

  updateRoutine(id: number, routine: Routine): Observable<Routine> {
    return this.http.put<Routine>(`${this.routineApiUrl}/${id}`, routine, {
      headers: this.getHeaders(),
    });
  }

  deleteRoutine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.routineApiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  /** EJERCICIOS */
  getExercisesByRoutineId(routineId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(
      `${this.exerciseApiUrl}/routine/${routineId}`,
      { headers: this.getHeaders() }
    );
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.exerciseApiUrl, exercise, {
      headers: this.getHeaders(),
    });
  }

  updateExercise(id: number, exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.exerciseApiUrl}/${id}`, exercise, {
      headers: this.getHeaders(),
    });
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.exerciseApiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
