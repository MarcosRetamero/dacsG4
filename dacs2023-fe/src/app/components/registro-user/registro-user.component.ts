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
  userId: string | null = null;
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
    this.authService.getUserId().subscribe((id) => {
      if (id) {
        this.userId = id;
        console.log('ID para registro (desde token actualizado):', this.userId);
        this.loadUserData(this.userId);
      } else {
        console.error('No se pudo obtener el ID del usuario');
        this.errorMessage = 'No se pudo verificar tu sesión. Intenta volver a iniciar sesión.';
      }
    });
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
    if (this.formulario.valid && this.userId !== null){
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.getUserEmail().subscribe(email => {
        const customerData: Customer = {
          id: this.userId!,
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
        console.log('✅ Usuario creado exitosamente');
  
        // Crear entrada en historial de progreso con el peso inicial
        const today = new Date().toISOString().split('T')[0];
        const pesoInicial = customerData.actualWeight;
  
        const progresoInicial = {
          customerId: customerData.id,
          date: today,
          weight: pesoInicial,
          progressDescription: 'Peso inicial',
          bodyFatPercentage: null
        };
  
        this.customerService.createProgress(progresoInicial).subscribe(
          () => {
            console.log('📈 Historial de progreso inicial registrado');
            this.router.navigate(['/dashboard-cliente']);
          },
          (error) => {
            console.error('❌ Error al crear el historial inicial:', error);
            this.errorMessage = 'Error al registrar el progreso inicial.';
            this.isLoading = false;
          }
        );
      },
      (error) => {
        this.errorMessage = 'Error al registrar usuario.';
        console.error('❌ Error al crear usuario:', error);
        this.isLoading = false;
      }
    );
  }
  
}
