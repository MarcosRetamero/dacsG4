import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import {
  Customer,
  CustomerService,
} from 'src/app/core/services/customer.service';
import { HistoricalProgressCreateDTO, HistoricalProgressService } from 'src/app/core/services/historicalProgress.service';
import {
  Routine,
  Exercise,
  WorkoutService,
} from 'src/app/core/services/routine.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css'],
})
export class DashboardClienteComponent implements OnInit {
  @ViewChild('pesoChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  customerId: string | null = null;
  email: string = '';

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

  private pesoInicialYaAsignado = false;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
    private customerService: CustomerService,
    private historicalProgressService: HistoricalProgressService,
    private workoutService: WorkoutService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUserId().subscribe((id) => {
      if (!id) {
        console.error('No se pudo obtener el ID del usuario');
        this.router.navigate(['/login']);
        return;
      }

      this.customerId = id;
      console.log('ID obtenido desde token:', id);

      this.authService.getUserEmail().subscribe((email) => {
        this.email = email || '';
      });

      this.cargarDatosUsuario();
      this.cargarRutinas();
      this.cargarHistorialPeso();
    });
  }

  public getExercisesForRoutine(routineId: number): Exercise[] {
    return this.exercisesByRoutine[routineId] || [];
  }

  cargarDatosUsuario() {
    if (!this.customerId) return;

    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (data) => {
        if (data) {
          this.nombre = data.name;
          this.edad = data.age;
          this.altura = data.stature;
          this.pesoActual = data.actualWeight;

          // Solo asignamos el peso inicial una vez
          if (!this.pesoInicialYaAsignado) {
            this.pesoInicialYaAsignado = true;
          }

          this.objetivoFisico = data.goal ?? '';
          this.grasaCorporal =
            data.imc ?? Math.trunc(this.pesoActual / Math.pow(this.altura / 100, 2));
        } else {
          this.router.navigate(['/registro-user']);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.router.navigate(['/registro-user']);
        } else {
          console.error('Error inesperado al cargar datos del usuario', error);
        }
      },
    });
  }

  cargarRutinas() {
    if (!this.customerId) return;

    this.workoutService.getRoutinesByUserId(this.customerId).subscribe(
      (rutinas) => {
        if (rutinas.length) {
          this.planEntrenamiento = rutinas;
          rutinas.forEach((rutina) => {
            this.cargarEjerciciosRutina(rutina.id);
          });
        } else {
          this.planEntrenamiento = [];
        }

      },
      (error) => {
        console.error('Error al obtener las rutinas del usuario', error);
        this.planEntrenamiento = [];
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

  cargarHistorialPeso() {
    if (!this.customerId) return;

    this.historicalProgressService
      .getProgressByUserId(this.customerId)
      .subscribe({
        next: (historial) => {
          if (historial && historial.length > 0) {
            this.historialPesos = historial.map((entry) => ({
              date: entry.date,
              weight: entry.weight,
            }));

            // ✅ El peso actual es el último
            this.pesoActual = historial[historial.length - 1].weight;

            // ✅ El peso inicial es el primero
            this.pesoInicial = historial[0].weight;
          } else {
            this.historialPesos = [{ date: 'Sin datos', weight: 0 }];
          }

          this.createChart();
        },
        error: (error) => {
          console.error('Error al obtener historial de peso:', error);
          this.historialPesos = [{ date: 'Sin datos', weight: 0 }];
          this.createChart();
        },
      });
  }


  guardarPeso() {
    if (!this.pesoTemporal || this.pesoTemporal <= 0 || !this.customerId) return;

    const today = new Date().toISOString().split('T')[0];

    const newProgress: HistoricalProgressCreateDTO = {
      customerId: this.customerId!,
      date: today,
      weight: this.pesoTemporal,
      progressDescription: null,
      bodyFatPercentage: null
    };

    this.historicalProgressService.createProgress(newProgress).subscribe({
      next: () => {
        this.editandoPeso = false;
        this.pesoActual = this.pesoTemporal;
        this.updateCustomerWeight(this.pesoTemporal);
        this.grasaCorporal = Math.trunc(this.pesoActual / Math.pow(this.altura / 100, 2)); // 🔥 esta línea actualiza el IMC
        this.cargarHistorialPeso(); // opcional: para refrescar la gráfica
      },
      error: (error) => {
        console.error('❌ Error al actualizar el peso:', error);
        this.editandoPeso = false;
      },
    });
  }

  private updateCustomerWeight(newWeight: number) {
    if (!this.customerId) return;

    const customerData: Customer = {
      id: this.customerId,
      name: this.nombre,
      age: this.edad,
      stature: this.altura,
      actualWeight: newWeight,
      goal: this.objetivoFisico,
      email: this.email,
      imc: Math.trunc(newWeight / Math.pow(this.altura / 100, 2)),
    };

    this.customerService
      .updateCustomer(this.customerId, customerData)
      .subscribe({
        next: () => {
          console.log('✅ Peso actualizado en el perfil del cliente');
        },
        error: (error) => {
          console.error('❌ Error al actualizar el peso en el perfil:', error);
        },
      });
  }

  guardarObjetivo() {
    if (!this.customerId) return;

    this.customerService
      .updateCustomerGoal(this.customerId, this.objetivoTemporal)
      .subscribe({
        next: () => {
          this.objetivoFisico = this.objetivoTemporal;
          this.editandoObjetivo = false;
        },
        error: (error) => {
          console.error('Error al actualizar el objetivo:', error);
          this.editandoObjetivo = false;
        },
      });
  }

  private createChart() {
    if (!this.chartCanvas || !this.historialPesos.length) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement;
    const labels = this.historialPesos.map((entry) =>
      entry.date === 'Sin datos'
        ? entry.date
        : new Date(entry.date).toLocaleDateString()
    );
    const data = this.historialPesos.map((entry) => entry.weight);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Peso (kg)',
            data,
            borderColor: '#710D07',
            backgroundColor: 'rgba(113, 13, 7, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: Math.max(0, Math.min(...data) - 5),  // arranca un poco antes del menor peso
            ticks: {
              callback: (value) => `${value} kg`,
            },
          },
        }

      },
    });
  }

  // UI handlers
  editarRutina(rutina: Routine) {
    this.router.navigate(['/plan-entrenamiento'], {
      state: { datosRutina: rutina },
    });
  }

  agregarRutina() {
    this.router.navigate(['/agregar-ejercicios']);
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

  obtenerNombreDia(dia: number): string {
    const diasSemana = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo'
    ];

    const index = (dia - 1 + 7) % 7; // ajusta para que 1=Lunes, 7=Domingo
    return diasSemana[index] || `Día ${dia}`;
  }
}
