import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService, Customer } from 'src/app/core/services/customer.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css'],
})
export class RegistroUserComponent implements OnInit {
  formulario: FormGroup;
  vieneDeDashboard: boolean = false;
  userId: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

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
    // Get ID directly from token for consistency
    this.userId = this.authService.getUserIdSync();

    if (this.userId) {
      console.log('ID para registro:', this.userId);
      this.loadUserData(this.userId);
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }

  loadUserData(id: string): void {
    this.customerService.getCustomerById(id).subscribe(
      (customer) => {
        if (customer) {
          console.log('Usuario existente, cargando datos:', customer);
          this.formulario.patchValue({
            nombre: customer.name,
            edad: customer.age,
            estatura: customer.stature,
            peso: customer.actualWeight,
          });
          // Si el usuario ya existe y no venimos del dashboard, redirigimos
          if (!this.vieneDeDashboard) {
            this.router.navigate(['/dashboard-cliente']);
          }
        } else {
          console.log('Usuario no encontrado, mostrando formulario vacío');
          // Aquí puedes redirigir a la página de registro
          this.router.navigate(['/registro-user']);
        }
      },
      (error) => {
        if (error.status === 404) {
          console.log('Usuario nuevo, mostrando formulario vacío');
          // Redirigir al formulario de registro en caso de error 404
          this.router.navigate(['/registro-user']);
        } else {
          console.error('Error al verificar usuario:', error);
          this.errorMessage = 'Error al verificar el estado del usuario.';
        }
      }
    );
  }


  onSubmit(): void {
    if (this.formulario.valid && this.userId) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.getUserEmail().subscribe(email => {
        const customerData: Customer = {
          id: this.userId,
          name: this.formulario.get('nombre')?.value,
          age: this.formulario.get('edad')?.value,
          stature: this.formulario.get('estatura')?.value,
          actualWeight: this.formulario.get('peso')?.value,
          goal: null,
          imc: null,
          email: email || ''
        };

        console.log('Intentando crear usuario con datos:', customerData);
        this.createCustomer(customerData);
      });
    } else {
      console.log('Formulario inválido:', {
        valid: this.formulario.valid,
        userId: this.userId,
        errors: this.formulario.errors
      });
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
    }
  }

  private createCustomer(customerData: Customer) {
    this.customerService.addCustomer(customerData).subscribe(
      () => {
        console.log('Usuario creado exitosamente');
        this.router.navigate(['/dashboard-cliente']);
      },
      (error) => {
        this.errorMessage = 'Error al registrar usuario.';
        console.error('Error al crear usuario:', error);
        this.isLoading = false;
      }
    );
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
