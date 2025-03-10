import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService, Customer } from 'src/app/core/services/customer.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';

interface CustomerResponse {
  customer: Customer;
  isNewUser: boolean;
}

@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css'],
})
export class RegistroUserComponent implements OnInit {
  formulario: FormGroup;
  vieneDeDashboard: boolean = false;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { datos: any };
    this.vieneDeDashboard = !!state?.datos;

    this.formulario = this.fb.group({
      nombre: [
        { value: '', disabled: this.vieneDeDashboard },
        [Validators.required, Validators.minLength(2)],
      ],
      edad: [
        null,
        [Validators.required, Validators.min(1), Validators.max(120)],
      ],
      estatura: [
        null,
        [Validators.required, Validators.min(1), Validators.max(300)],
      ],
      peso: [
        null,
        [Validators.required, Validators.min(1), Validators.max(500)],
      ],
    });
  }

  ngOnInit(): void {
    this.authService.getUserId().subscribe((id: string | null) => {
      if (id) {
        this.userId = id;
        this.loadUserData(id);
      } else {
        console.error('No se pudo obtener el ID del usuario');
      }
    });
  }

  loadUserData(id: string): void {
    this.customerService.isNewUser(id).subscribe(
      (response: CustomerResponse) => {
        const { customer, isNewUser } = response;
        if (!isNewUser) {
          this.formulario.patchValue({
            nombre: customer.name,
            edad: customer.age,
            estatura: customer.stature,
            peso: customer.actualWeight,
          });
        }
      },
      (error: Error) =>
        console.error('Error al cargar datos del usuario:', error)
    );
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const customerData: Customer = {
        id: this.userId,
        name: this.formulario.get('nombre')?.value,
        age: this.formulario.get('edad')?.value,
        stature: this.formulario.get('estatura')?.value,
        actualWeight: this.formulario.get('peso')?.value,
      };

      this.customerService.getCustomerById(this.userId).subscribe(
        (existingCustomer: Customer) => {
          // Si el usuario ya existe, actualizar
          this.customerService
            .updateCustomer(this.userId, customerData)
            .subscribe(
              () => this.router.navigate(['/dashboard-cliente']),
              (error: Error) => console.error('Error al actualizar:', error)
            );
        },
        () => {
          // Si no existe, crearlo
          this.customerService.addCustomer(customerData).subscribe(
            () => this.router.navigate(['/dashboard-cliente']),
            (error: Error) => console.error('Error al registrar:', error)
          );
        }
      );
    }
  }
}

/* CODIGO MOCKEADO
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css'],
})
export class RegistroUserComponent {
  formulario: FormGroup;
  vieneDeDashboard: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    // Obtener los datos del estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { datos: any };

    // Si hay datos en el state, significa que viene del dashboard
    this.vieneDeDashboard = !!state?.datos;

    this.formulario = this.fb.group({
      nombre: [
        {
          value: state?.datos?.nombre || '',
          disabled: this.vieneDeDashboard,
        },
        [Validators.required, Validators.minLength(2)],
      ],
      edad: [
        state?.datos?.edad || null,
        [Validators.required, Validators.min(1), Validators.max(120)],
      ],
      estatura: [
        state?.datos?.altura || null,
        [Validators.required, Validators.min(1), Validators.max(300)],
      ],
      peso: [
        state?.datos?.pesoActual || null,
        [Validators.required, Validators.min(1), Validators.max(500)],
      ],
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const datosActualizados = {
        nombre:
          this.formulario.get('nombre')?.value ||
          this.formulario.get('nombre')?.disabled
            ? this.formulario.get('nombre')?.value
            : '',
        edad: this.formulario.get('edad')?.value,
        altura: this.formulario.get('estatura')?.value,
        pesoActual: this.formulario.get('peso')?.value,
      };

      // Log detallado de los datos
      console.log('Formulario válido:', this.formulario.valid);
      console.log('Valores del formulario:', this.formulario.value);
      console.log('Datos que se envían al dashboard:', datosActualizados);

      this.router.navigate(['/dashboard-cliente'], {
        state: { datosActualizados },
      });
    } else {
      console.log('Formulario inválido:', this.formulario.errors);
    }
  }
} */
