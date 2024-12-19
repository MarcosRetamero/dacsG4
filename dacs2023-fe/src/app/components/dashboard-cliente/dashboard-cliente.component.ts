import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css']
})
export class DashboardClienteComponent implements OnInit {
  @ViewChild('pesoChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  // Datos de usuario
  nombre: string = 'Juan Pérez';
  edad: number = 28;
  objetivoFisico: string = 'Perder peso y ganar masa muscular';
  pesoInicial: number = 80;
  pesoActual: number = 75;
  grasaCorporal: number = 18;
  nombreEntrenador: string = 'Carlos López';
  especialidad: string = 'Entrenamiento de fuerza';

  planEntrenamiento = [
    { dia: 'Lunes', grupoMuscular: 'Pecho y tríceps' },
    { dia: 'Martes', grupoMuscular: 'Piernas y glúteos' },
    { dia: 'Miércoles', grupoMuscular: 'Espalda y bíceps' },
  ];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.createChart();
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'Peso (kg)',
          data: [80, 78, 76, 75, 75],
          backgroundColor: '#710D07',
          borderColor: 'var(--primary-color)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
          x: { grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  agregarPeso() {
    console.log('Agregando nuevo peso');
  }
}
