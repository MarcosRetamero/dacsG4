import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

// Define la interfaz de Customer según la respuesta del backend
export interface Customer {
  id: string;
  actualWeight: number;
  stature: number;
  age: number;
  name: string;
  email: string;
  goal: string | null;
  imc?: number | null; // Optional field for frontend calculations
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:9001/bff/backend/customer'; // Endpoint base

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCustomers(): Observable<Customer[]> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<Customer[]>(`${this.apiUrl}`, { headers });
      })
    );
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers });
      })
    );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.post<Customer>(this.apiUrl, customer, { headers });
      })
    );
  }

  updateCustomerGoal(id: string, goal: string): Observable<Customer> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.put<Customer>(`${this.apiUrl}/${id}/goal`, { goal }, { headers });
      })
    );
  }


  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer, { headers });
      })
    );
  }

  deleteCustomer(id: string): Observable<void> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
      })
    );
  }

  isNewUser(id: string): Observable<{ customer: Customer | null, isNewUser: boolean }> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers }).pipe(
          map((customer: Customer) => {
            const isNewUser = !customer.name || !customer.age || !customer.stature || !customer.actualWeight;
            return { customer, isNewUser };
          }),
          catchError((error) => {
            if (error.status === 404) {
              return of({ customer: null, isNewUser: true });
            }
            return throwError(() => error);
          })
        );
      })
    );
  }

  createProgress(progress: {
    customerId: string;
    date: string;
    weight: number;
    progressDescription?: string | null;
    bodyFatPercentage?: number | null;
  }): Observable<any> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.post('http://localhost:9001/bff/backend/historical-progress', progress, { headers });
      })
    );
  }
}
