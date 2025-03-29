import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

export interface Exercise {
  id: number;
  name: string;
  description: string;
  image: string;
  reps: number;
  sets: number;
  routineId: number;
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
  private exerciseApiUrl = 'http://localhost:9001/bff/backend/exercise';
  private exerciseImagesApiUrl = 'http://localhost:9001/bff/conector/exercises/with-images';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** OBTENER EJERCICIOS DISPONIBLES CON IMÁGENES (NO necesita token) */
  getAvailableExercises(): Observable<ExerciseImage[]> {
    return this.http.get<ExerciseImage[]>(this.exerciseImagesApiUrl);
  }

  /** RUTINAS */
  getRoutinesByUserId(userId: string): Observable<Routine[]> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Routine[]>(`${this.routineApiUrl}/customer/${userId}`, { headers });
      })
    );
  }

  getRoutineById(id: number): Observable<Routine> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Routine>(`${this.routineApiUrl}/${id}`, { headers });
      })
    );
  }

  createRoutine(routine: Routine): Observable<Routine> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.post<Routine>(this.routineApiUrl, routine, { headers });
      })
    );
  }

  updateRoutine(id: number, routine: Routine): Observable<Routine> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.put<Routine>(`${this.routineApiUrl}/${id}`, routine, { headers });
      })
    );
  }

  deleteRoutine(id: number): Observable<void> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.delete<void>(`${this.routineApiUrl}/${id}`, { headers });
      })
    );
  }

  /** EJERCICIOS */
  getExercisesByRoutineId(routineId: number): Observable<Exercise[]> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Exercise[]>(`${this.exerciseApiUrl}/routine/${routineId}`, { headers });
      })
    );
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.post<Exercise>(this.exerciseApiUrl, exercise, { headers });
      })
    );
  }

  updateExercise(id: number, exercise: Exercise): Observable<Exercise> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.put<Exercise>(`${this.exerciseApiUrl}/${id}`, exercise, { headers });
      })
    );
  }

  deleteExercise(id: number): Observable<void> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.delete<void>(`${this.exerciseApiUrl}/${id}`, { headers });
      })
    );
  }
}
