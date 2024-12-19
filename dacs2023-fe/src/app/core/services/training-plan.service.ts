import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Importa la configuración del entorno

@Injectable({
  providedIn: 'root',
})
export class TrainingPlanService {
  // Usa la URL de la base de datos configurada en el archivo de entorno
  private apiUrl = `${environment.databaseUrl}/training_plan`; // API de la base de datos

  constructor(private http: HttpClient) {}

  // Obtener todos los planes de entrenamiento
  getTrainingPlans(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener plan de entrenamiento por ID
  getTrainingPlanById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo plan de entrenamiento
  addTrainingPlan(trainingPlanData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, trainingPlanData);
  }

  // Actualizar plan de entrenamiento
  updateTrainingPlan(id: number, trainingPlanData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, trainingPlanData);
  }

  // Eliminar plan de entrenamiento
  deleteTrainingPlan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
