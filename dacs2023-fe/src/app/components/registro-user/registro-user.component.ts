import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService, Customer } from 'src/app/core/services/customer.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
    this.authService.getUserId().subscribe(
      (id: string | null) => {
        if (id) {
          this.userId = id;
          // Intentamos cargar los datos, si falla asumimos que es un usuario nuevo
          this.loadUserData(id);
        } else {
          this.errorMessage = 'No se pudo obtener el ID del usuario.';
          console.error('No se pudo obtener el ID del usuario');
        }
      },
      (error) => {
        console.error('Error al obtener el ID del usuario:', error);
        this.errorMessage = 'Error al obtener la identificación del usuario.';
      }
    );
  }

  loadUserData(id: string): void {
    // Intentamos obtener directamente los datos del usuario
    this.customerService.getCustomerById(id)
      .pipe(
        catchError(error => {
          // Si hay cualquier error, asumimos que es un usuario nuevo
          console.log('Usuario no encontrado o error, procediendo como usuario nuevo');
          return of(null);
        })
      )
      .subscribe(
        (customer) => {
          if (customer) {
            // Si encontramos el usuario, cargamos sus datos
            this.formulario.patchValue({
              nombre: customer.name,
              edad: customer.age,
              estatura: customer.stature,
              peso: customer.actualWeight,
            });
          }
          // Si no hay customer, el formulario queda vacío para nuevo registro
        }
      );
  }

  onSubmit(): void {
    if (this.formulario.valid && this.userId) {
      this.isLoading = true;
      this.errorMessage = '';

      const customerData: Customer = {
        id: this.userId,
        name: this.formulario.get('nombre')?.value,
        age: this.formulario.get('edad')?.value,
        stature: this.formulario.get('estatura')?.value,
        goal: '',
        actualWeight: this.formulario.get('peso')?.value,
      };

      console.log('Intentando crear/actualizar usuario con los siguientes datos:', {
        ...customerData,
        formularioValido: this.formulario.valid,
        valoresFormulario: this.formulario.value,
        estadoFormulario: this.formulario.status,
      });

      // Intentamos crear directamente el usuario
      this.createCustomer(customerData);
    } else {
      console.log('Formulario inválido:', {
        formularioValido: this.formulario.valid,
        valoresFormulario: this.formulario.value,
        errores: this.formulario.errors,
        userId: this.userId
      });
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
    }
  }

  private createCustomer(customerData: Customer) {
    console.log('Enviando petición al backend:', {
      url: 'POST /customer',
      datos: customerData,
      headers: 'Authorization Bearer incluido'
    });

    this.customerService.addCustomer(customerData)
      .pipe(
        catchError(error => {
          console.log('Error en creación, intentando actualizar:', {
            error: error,
            status: error.status,
            mensaje: error.message
          });
          if (error.status === 409) {
            console.log('Usuario existe, intentando actualizar con:', customerData);
            return this.customerService.updateCustomer(this.userId, customerData);
          }
          throw error;
        })
      )
      .subscribe(
        (response) => {
          console.log('Respuesta exitosa del servidor:', response);
          this.router.navigate(['/dashboard-cliente']);
        },
        (error) => {
          console.error('Error detallado al procesar usuario:', {
            error: error,
            status: error.status,
            mensaje: error.message,
            datos: customerData
          });
          this.errorMessage = 'Error al procesar los datos del usuario. Por favor, intente nuevamente.';
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
