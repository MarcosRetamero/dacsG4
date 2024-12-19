import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Importa la configuración del entorno

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  // Usa la URL de la base de datos configurada en el archivo de entorno
  private apiUrl = `${environment.databaseUrl}/customer`; // API de la base de datos

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  getCustomers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener cliente por ID
  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo cliente
  addCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customerData);
  }

  // Actualizar cliente
  updateCustomer(id: number, customerData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customerData);
  }

  // Eliminar cliente
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
