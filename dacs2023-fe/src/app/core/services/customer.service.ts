import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

// Define la interfaz de Customer
export interface Customer {
  id: string; // ID como string para el UID de Keycloak
  name: string;
  age: number;
  stature: number;
  actualWeight: number;
  goal: string
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:9001/bff/backend/customer'; // Reemplaza con tu endpoint
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Obtiene el token de autenticación
    this.authService.getToken().subscribe((token: string | null) => {
      this.token = token;
    });
  }

  // Obtener todos los clientes
  getCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<Customer[]>(`${this.apiUrl}`, { headers });
  }

  // Obtener un cliente por su ID
  getCustomerById(id: string): Observable<Customer> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers });
  }

  // Agregar un nuevo cliente
  addCustomer(customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Customer>(this.apiUrl, customer, { headers });
  }

  // Actualizar un cliente
  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer, { headers });
  }

  // Eliminar un cliente
  deleteCustomer(id: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }


    // Obtener un cliente por su ID y verificar campos vacíos
    isNewUser(id: string): Observable<{ customer: Customer | null, isNewUser: boolean }> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });

      return this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers }).pipe(
        map((customer: Customer) => {
          const isNewUser = !customer.name || !customer.age || !customer.stature || !customer.actualWeight;
          return { customer, isNewUser };
        }),
        catchError((error) => {
          // Si el error es 404, considera que es un usuario nuevo
          if (error.status === 404) {
            return of({ customer: null, isNewUser: true });
          }
          // Otros errores
          return throwError(() => error);
        })
      );
    }
}
