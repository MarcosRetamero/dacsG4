import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { HistoricalProgressService } from 'src/app/core/services/historicalProgress.service';
import { Routine, WorkoutService } from 'src/app/core/services/routine.service';

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
  historialPesos: { date: string; weight: number }[] = [];

  editandoObjetivo: boolean = false;
  objetivoTemporal: string = '';
  editandoPeso: boolean = false;
  pesoTemporal: number = 0;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private historicalProgressService: HistoricalProgressService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.cargarRutinas();
    this.cargarHistorialPeso();
  }

  cargarDatosUsuario() {
    this.customerService.getCustomerById(this.customerId).subscribe(
      (data) => {
        this.nombre = data.name;
        this.edad = data.age;
        this.altura = data.stature;
        this.pesoInicial = data.actualWeight;
        this.pesoActual = data.actualWeight;
        this.grasaCorporal = Math.trunc(this.pesoActual / Math.pow(this.altura / 100, 2));
      },
      (error) => console.error('Error al obtener los datos del usuario', error)
    );
  }

  cargarRutinas() {
    this.workoutService.getRoutinesByUserId(this.customerId).subscribe(
      (rutinas) => {
        this.planEntrenamiento = rutinas;
      },
      (error) => console.error('Error al obtener las rutinas del usuario', error)
    );
  }

  cargarHistorialPeso() {
    this.historicalProgressService.getProgressByUserId(this.customerId).subscribe(
      (historial) => {
        this.historialPesos = historial.map((entry: any) => ({
          date: entry.date,
          weight: entry.weight,
        }));
        this.createChart();
      },
      (error) => console.error('Error al obtener historial de peso', error)
    );
  }

  ngAfterViewInit() {
    this.createChart();
  }

  private createChart() {
    if (!this.historialPesos.length) return;

    const ctx = this.chartCanvas.nativeElement;
    const labels = this.historialPesos.map((entry) => entry.date);
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
          y: { beginAtZero: false },
        },
      },
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
    this.objetivoFisico = this.objetivoTemporal;
    this.editandoObjetivo = false;
  }
  
  cancelarEdicion() {
    this.editandoObjetivo = false;
  }
  
  guardarPeso() {
    this.pesoActual = this.pesoTemporal;
    this.editandoPeso = false;
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