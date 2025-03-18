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
    this.authService.getUserId().subscribe(
      (id: string | null) => {
        if (id) {
          this.userId = id;
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
    this.customerService.isNewUser(id).subscribe(
      (response) => {
        const { customer, isNewUser } = response;
        if (!isNewUser && customer) {
          // El usuario ya existe, cargamos los datos
          this.formulario.patchValue({
            nombre: customer.name,
            edad: customer.age,
            estatura: customer.stature,
            peso: customer.actualWeight,
          });
        } else if (isNewUser) {
          // Si es un usuario nuevo, continuamos con el registro
          console.log('Usuario nuevo, continuando con el registro');
        }
      },
      (error) => {
        if (error.status === 404) {
          console.log('Usuario nuevo, continuando con el registro');
        } else {
          this.errorMessage = 'Error al verificar el estado del usuario.';
          console.error('Error al cargar los datos del usuario:', error);
        }
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

      this.customerService.getCustomerById(this.userId).subscribe(
        (existingCustomer) => {
          if (existingCustomer) {
            this.updateCustomer(customerData);
          } else {
            this.createCustomer(customerData);
          }
        },
        (error) => {
          if (error.status === 404) {
            this.createCustomer(customerData);
          } else {
            this.errorMessage = 'Error al verificar usuario.';
            console.error('Error al verificar usuario:', error);
            this.isLoading = false;
          }
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
    }
  }

  private updateCustomer(customerData: Customer) {
    this.customerService.updateCustomer(this.userId, customerData).subscribe(
      () => {
        console.log('Usuario actualizado exitosamente');
        this.router.navigate(['/dashboard-cliente']);
      },
      (error) => {
        this.errorMessage = 'Error al actualizar los datos.';
        console.error('Error al actualizar usuario:', error);
        this.isLoading = false;
      }
    );
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
