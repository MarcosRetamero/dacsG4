import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Customer, CustomerService } from 'src/app/core/services/customer.service';
import { HistoricalProgressService } from 'src/app/core/services/historicalProgress.service';
import { Routine, Exercise, WorkoutService } from 'src/app/core/services/routine.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css'],
})
export class DashboardClienteComponent implements OnInit {
  @ViewChild('pesoChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  customerId: string = '';
  nombre: string = '';
  edad: number = 0;
  objetivoFisico: string = '';
  pesoInicial: number = 0;
  altura: number = 0;
  pesoActual: number = 0;
  grasaCorporal: number = 0;

  planEntrenamiento: Routine[] = [];
  exercisesByRoutine: { [key: number]: Exercise[] } = {};
  historialPesos: { date: string; weight: number }[] = [];

  editandoObjetivo: boolean = false;
  objetivoTemporal: string = '';
  editandoPeso: boolean = false;
  pesoTemporal: number = 0;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
    private customerService: CustomerService,
    private historicalProgressService: HistoricalProgressService,
    private workoutService: WorkoutService,
    private authService: AuthService  // Add this
  ) {}

  async ngOnInit() {
    // Get ID directly from token for consistency
    this.customerId = this.authService.getUserIdSync();

    if (!this.customerId) {
      console.error('No se pudo obtener el ID del usuario');
      return;
    }

    console.log('ID obtenido del token:', this.customerId);

    // For debugging, also log the ID from getUserId method
    this.authService.getUserId().subscribe(id => {
      console.log('ID obtenido de getUserId:', id);
    });

    this.cargarDatosUsuario();
    this.cargarRutinas();
    this.cargarHistorialPeso();
  }

  cargarDatosUsuario() {
    console.log('Intentando cargar datos para el ID:', this.customerId);
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (data) => {
        console.log('Datos del usuario recibidos:', data);
        if (data) {
          this.nombre = data.name;
          this.edad = data.age;
          this.altura = data.stature;
          this.pesoInicial = data.actualWeight;
          this.pesoActual = data.actualWeight;
          this.objetivoFisico = data.goal ?? '';
          // Calculate IMC if not provided by the backend
          this.grasaCorporal = data.imc ?? Math.trunc(this.pesoActual / Math.pow(this.altura / 100, 2));
        } else {
          console.log('No se encontraron datos para el usuario, redirigiendo a registro');
          this.router.navigate(['/registro-user']);
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos del usuario', error);
        if (error.status === 404) {
          console.log('Usuario no encontrado en la BD, redirigiendo a registro');
          this.router.navigate(['/registro-user']);
        } else {
          console.error('Error inesperado al cargar datos del usuario');
        }
      }
    });
  }

  cargarRutinas() {
    this.workoutService.getRoutinesByUserId(this.customerId).subscribe(
      (rutinas) => {
        if (rutinas.length) {
          this.planEntrenamiento = rutinas;
          // Cargar ejercicios para cada rutina
          rutinas.forEach(rutina => {
            this.cargarEjerciciosRutina(rutina.id);
          });
        } else {
          this.planEntrenamiento = [{
            id: 0,
            userId: this.customerId,
            routineName: 'No hay rutinas disponibles',
            day: 0
          }];
        }
      },
      (error) => {
        console.error('Error al obtener las rutinas del usuario', error);
        this.planEntrenamiento = [{
          id: 0,
          userId: this.customerId,
          routineName: 'No hay rutinas disponibles',
          day: 0
        }];
      }
    );
  }

  cargarEjerciciosRutina(routineId: number) {
    this.workoutService.getExercisesByRoutineId(routineId).subscribe(
      (exercises) => {
        this.exercisesByRoutine[routineId] = exercises;
      },
      (error) => {
        console.error('Error al cargar ejercicios de la rutina', error);
        this.exercisesByRoutine[routineId] = [];
      }
    );
  }

  getExercisesForRoutine(routineId: number): Exercise[] {
    return this.exercisesByRoutine[routineId] || [];
  }

  cargarHistorialPeso() {
    this.historicalProgressService.getProgressByUserId(this.customerId).subscribe({
      next: (historial) => {
        if (historial && historial.length > 0) {
          this.historialPesos = historial.map(entry => ({
            date: entry.date,
            weight: entry.weight
          }));
          this.pesoActual = historial[historial.length - 1].weight; // Update current weight
        } else {
          this.historialPesos = [{ date: 'Sin datos', weight: 0 }];
        }
        this.createChart();
      },
      error: (error) => {
        console.error('Error al obtener historial de peso:', error);
        this.historialPesos = [{ date: 'Sin datos', weight: 0 }];
        this.createChart();
      }
    });
}

// Add method to handle weight updates
guardarPeso() {
    if (!this.pesoTemporal || this.pesoTemporal <= 0) {
      console.error('Peso inválido');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newProgress = {
      date: today,
      weight: this.pesoTemporal,
      progressDescription: null,
      bodyFatPercentage: null
    };

    this.historicalProgressService.createProgress(this.customerId, newProgress).subscribe({
      next: (response) => {
        console.log('Peso actualizado correctamente');
        this.editandoPeso = false;
        this.pesoActual = this.pesoTemporal;

        // Also update the customer data with the new weight
        this.updateCustomerWeight(this.pesoTemporal);

        this.cargarHistorialPeso(); // Reload chart data
      },
      error: (error) => {
        console.error('Error al actualizar el peso:', error);
        this.editandoPeso = false;
      }
    });
  }

  // New method to update customer weight
  private updateCustomerWeight(newWeight: number) {
    const customerData: Customer = {
      id: this.customerId,
      name: this.nombre,
      age: this.edad,
      stature: this.altura,
      actualWeight: newWeight,
      goal: this.objetivoFisico,
      email: this.authService.getUserIdSync() ? this.keycloakService.getKeycloakInstance().tokenParsed?.['email'] || '' : '',
      imc: Math.trunc(newWeight / Math.pow(this.altura / 100, 2))
    };

    this.customerService.updateCustomer(this.customerId, customerData).subscribe({
      next: () => {
        console.log('Peso actualizado en el perfil del cliente');
      },
      error: (error) => {
        console.error('Error al actualizar el peso en el perfil:', error);
      }
    });
  }

// Update chart creation method
private createChart() {
    if (!this.chartCanvas || !this.historialPesos.length) return;

    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart before creating a new one
    }

    const ctx = this.chartCanvas.nativeElement;
    const labels = this.historialPesos.map(entry =>
      entry.date === 'Sin datos' ? entry.date : new Date(entry.date).toLocaleDateString()
    );
    const data = this.historialPesos.map(entry => entry.weight);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Peso (kg)',
          data,
          borderColor: '#710D07',
          backgroundColor: 'rgba(113, 13, 7, 0.2)',
          borderWidth: 2,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value) => `${value} kg`
            }
          }
        }
      }
    });
}

  editarRutina(rutina: Routine) {
    this.router.navigate(['/plan-entrenamiento'], {
      state: { datosRutina: rutina },
    });
  }

  agregarRutina() {
    this.router.navigate(['/agregar-ejercicios']);
  }

  guardarObjetivo() {
    // Use keycloakService directly to get email
    const email = this.keycloakService.getKeycloakInstance().tokenParsed?.['email'] || '';

    const customerData: Customer = {
      id: this.customerId,
      name: this.nombre,
      age: this.edad,
      stature: this.altura,
      actualWeight: this.pesoActual,
      goal: this.objetivoTemporal,
      email: email,
      imc: this.grasaCorporal
    };

    this.customerService.updateCustomer(this.customerId, customerData).subscribe({
      next: () => {
        this.objetivoFisico = this.objetivoTemporal;
        this.editandoObjetivo = false;
      },
      error: (error) => {
        console.error('Error al actualizar el objetivo:', error);
        this.editandoObjetivo = false;
      }
    });
  }

  cancelarEdicion() {
    this.editandoObjetivo = false;
  }


  cancelarEdicionPeso() {
    this.editandoPeso = false;
  }

  editarDatos() {
    this.editandoObjetivo = true;
    this.objetivoTemporal = this.objetivoFisico;
  }

  cambiarObjetivo() {
    this.editandoObjetivo = true;
  }

  agregarPeso() {
    this.editandoPeso = true;
  }

  private obtenerNombreDia(dia: number): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return diasSemana[dia];
  }
}
