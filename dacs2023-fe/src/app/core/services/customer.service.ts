import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

// Define la interfaz de Customer
export interface Customer {
  id: string; // ID como string para el UID de Keycloak
  name: string;
  age: number;
  stature: number;
  actualWeight: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:9001/bff/backend/customers'; // Reemplaza con tu endpoint
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
    isNewUser(id: string): Observable<{ customer: Customer, isNewUser: boolean }> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });

      return new Observable(observer => {
        this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers }).subscribe(
          (customer) => {
            // Verifica si los campos están vacíos
            const isNewUser = !customer.name || !customer.age || !customer.stature || !customer.actualWeight;

            // Devuelve el cliente y si es un nuevo usuario
            observer.next({ customer, isNewUser });
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      });
    }

}
