import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

// Define la interfaz de Routine
export interface Routine {
  id: number;
  userId: string;  // ID de usuario como string (Keycloak)
  routineName: string;
  goal: number;
  day: number; // Día de la semana (1 a 7)
}

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  private apiUrl = 'http://localhost:9001/bff/backend/routines'; // Reemplaza con tu endpoint
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Obtiene el token de autenticación
    this.authService.getToken().subscribe((token: string | null) => {
      this.token = token;
    });
  }

  // Obtener todas las rutinas de un cliente
  getRoutinesByUserId(userId: string): Observable<Routine[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<Routine[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  // Obtener una rutina por su ID
  getRoutineById(id: number): Observable<Routine> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<Routine>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear una nueva rutina
  createRoutine(routine: Routine): Observable<Routine> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Routine>(this.apiUrl, routine, { headers });
  }

  // Actualizar una rutina existente
  updateRoutine(id: number, routine: Routine): Observable<Routine> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<Routine>(`${this.apiUrl}/${id}`, routine, { headers });
  }

  // Eliminar una rutina por su ID
  deleteRoutine(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
