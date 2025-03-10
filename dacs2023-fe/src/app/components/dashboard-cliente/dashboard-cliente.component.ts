import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ExerciseService } from 'src/app/core/services/exercise.service';
import { HistoricalProgressService } from 'src/app/core/services/historicalProgress.service';
import { RoutineService } from 'src/app/core/services/routine.service';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css'],
})
export class DashboardClienteComponent implements OnInit {
  @ViewChild('pesoChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  // Datos de usuario
  customerId: string = ''; // Esto debería obtenerse de autenticación o sesión
  nombre: string = '';
  edad: number = 0;
  objetivoFisico: string = '';
  pesoInicial: number = 0;
  altura: number = 0;
  pesoActual: number = 0;
  grasaCorporal: number = 0;

  planEntrenamiento: any[] = [];

  historialPesos: { date: string; weight: number }[] = [];

  editandoObjetivo: boolean = false;
  objetivoTemporal: string = '';
  editandoPeso: boolean = false;
  pesoTemporal: number = 0;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private routineService: RoutineService,
    private exerciseService: ExerciseService,
    private historicalProgressService: HistoricalProgressService
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
        this.grasaCorporal = Math.trunc(
          this.pesoActual / Math.pow(this.altura / 100, 2)
        );
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  cargarRutinas() {
    this.routineService.getRoutinesByUserId(this.customerId).subscribe(
      (rutinas) => {
        this.planEntrenamiento = rutinas.map((rutina: any) => ({
          dia: this.obtenerNombreDia(rutina.day),
          grupoMuscular: rutina.routineName,
          ejercicios: [],
        }));

        rutinas.forEach((rutina: any, index: number) => {
          this.exerciseService.getExercisesByRoutineId(rutina.id).subscribe(
            (ejercicios) => {
              this.planEntrenamiento[index].ejercicios = ejercicios;
            },
            (error) =>
              console.error(
                `Error al obtener ejercicios de la rutina ${rutina.id}`,
                error
              )
          );
        });
      },
      (error) => {
        console.error('Error al obtener las rutinas del usuario', error);
      }
    );
  }

  cargarHistorialPeso() {
    this.historicalProgressService
      .getProgressByUserId(this.customerId)
      .subscribe(
        (historial) => {
          this.historialPesos = historial.map((entry: any) => ({
            date: entry.date,
            weight: entry.weight,
          }));
          this.createChart();
        },
        (error) => {
          console.error('Error al obtener historial de peso', error);
        }
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
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }

  cambiarObjetivo() {
    this.editandoObjetivo = !this.editandoObjetivo;
    this.objetivoTemporal = this.objetivoFisico;
  }

  guardarObjetivo() {
    if (this.objetivoTemporal.trim() !== '') {
      this.objetivoFisico = this.objetivoTemporal.trim();
      this.customerService
        .updateCustomer(this.customerId, {
          objetivoFisico: this.objetivoFisico,
        })
        .subscribe(
          () => {
            this.editandoObjetivo = false;
          },
          (error) => console.error('Error al actualizar el objetivo', error)
        );
    }
  }

  cancelarEdicion() {
    this.editandoObjetivo = false;
    this.objetivoTemporal = '';
  }

  agregarPeso() {
    this.editandoPeso = true;
    this.pesoTemporal = this.pesoActual;
  }

  guardarPeso() {
    if (this.pesoTemporal > 0) {
      this.pesoActual = this.pesoTemporal;
      this.historicalProgressService
        .addProgress({
          userId: this.customerId,
          date: new Date().toISOString().split('T')[0],
          weight: this.pesoActual,
        })
        .subscribe(
          () => {
            this.cargarHistorialPeso();
            this.editandoPeso = false;
          },
          (error) => console.error('Error al agregar progreso de peso', error)
        );
    }
  }

  cancelarEdicionPeso() {
    this.editandoPeso = false;
    this.pesoTemporal = this.pesoActual;
  }

  editarDatos() {
    this.router.navigate(['/registro-user'], {
      state: {
        datos: {
          nombre: this.nombre,
          edad: this.edad,
          altura: this.altura,
          pesoActual: this.pesoActual,
        },
      },
    });
  }

  agregarRutina() {
    this.router.navigate(['/agregar-ejercicios']);
  }

  editarRutina(dia: any) {
    this.router.navigate(['/plan-entrenamiento'], {
      state: {
        datosRutina: { nombreUsuario: this.nombre, diaSeleccionado: dia.dia },
      },
    });
  }

  private obtenerNombreDia(dia: number): string {
    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    return diasSemana[dia];
  }
}

/* MOCKEADO
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css'],
})
export class DashboardClienteComponent implements OnInit {
  @ViewChild('pesoChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  // Datos de usuario
  nombre: string = '';
  edad: number = 0;
  objetivoFisico: string = '';
  pesoInicial: number = 0;
  altura: number = 0;
  pesoActual: number = 0;
  grasaCorporal: number = 0; // Se recalculará en ngOnInit()

  planEntrenamiento = [
    {
      dia: 'Lunes',
      grupoMuscular: 'Pecho y tríceps',
      ejercicios: [
        { nombre: 'Press de banca', series: 4, repeticiones: 10, descanso: 60 },
        {
          nombre: 'Aperturas con mancuernas',
          series: 3,
          repeticiones: 12,
          descanso: 60,
        },
        { nombre: 'Fondos', series: 3, repeticiones: 15, descanso: 60 },
      ],
    },
    {
      dia: 'Martes',
      grupoMuscular: 'Piernas y glúteos',
      ejercicios: [
        { nombre: 'Sentadillas', series: 4, repeticiones: 12, descanso: 90 },
        { nombre: 'Peso muerto', series: 3, repeticiones: 10, descanso: 90 },
        { nombre: 'Zancadas', series: 3, repeticiones: 12, descanso: 90 },
      ],
    },
  ];

  editandoObjetivo: boolean = false;
  objetivoTemporal: string = '';
  editandoPeso: boolean = false;
  pesoTemporal: number = 0;

  // Agregar la propiedad entrenador
  entrenador: string = 'Sin asignar';

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('History state completo:', history.state);

    if (history.state?.datosActualizados) {
      console.log('Datos recibidos en dashboard:', history.state.datosActualizados);

      this.nombre = history.state.datosActualizados.nombre || this.nombre;
      this.edad = history.state.datosActualizados.edad || this.edad;
      this.altura = history.state.datosActualizados.altura || this.altura;
      this.pesoInicial = history.state.datosActualizados.pesoActual || this.pesoInicial;
      this.pesoActual = history.state.datosActualizados.pesoActual || this.pesoActual;

      // Recalcular el IMC con los nuevos datos
      if (this.altura > 0) {
        this.grasaCorporal = Math.trunc(this.pesoActual / Math.pow(this.altura / 100, 2));
      }

      console.log('Datos actualizados en el componente:', {
        nombre: this.nombre,
        edad: this.edad,
        altura: this.altura,
        pesoInicial: this.pesoInicial,
        pesoActual: this.pesoActual,
        IMC: this.grasaCorporal,
      });
    } else {
      console.log('No se recibieron datos actualizados');
    }
  }

  ngAfterViewInit() {
    this.createChart();
  }

  private createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
          {
            label: 'Peso (kg)',
            data: [80, 78, 76, 75, 75],
            backgroundColor: '#710D07',
            borderColor: 'var(--primary-color)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}

*/
