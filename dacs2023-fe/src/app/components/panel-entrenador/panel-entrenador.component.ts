import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-entrenador',
  templateUrl: './panel-entrenador.component.html',
  styleUrls: ['./panel-entrenador.component.css']
})
export class PanelEntrenadorComponent {
  alumnos = [
    { nombre: 'Ana García' },
    { nombre: 'Carlos Rodríguez' },
    { nombre: 'María López' },
  ];

  rutinas = [
    { nombre: 'Rutina de fuerza' },
    { nombre: 'Cardio intenso' },
    { nombre: 'Yoga para principiantes' },
  ];

  alumnosFiltrados = [...this.alumnos];
  rutinasFiltradas = [...this.rutinas];
  modoOscuro = false; // Variable para alternar el modo oscuro

  filtrarAlumnos(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.alumnosFiltrados = this.alumnos.filter(alumno =>
      alumno.nombre.toLowerCase().includes(filtro)
    );
  }

  filtrarRutinas(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.rutinasFiltradas = this.rutinas.filter(rutina =>
      rutina.nombre.toLowerCase().includes(filtro)
    );
  }

  verDetalleAlumno(alumno: any): void {
    console.log('Detalle del alumno:', alumno);
  }

  verDetalleRutina(rutina: any): void {
    console.log('Detalle de la rutina:', rutina);
  }

  agregarAlumno(): void {
    console.log('Agregar nuevo alumno');
    // Lógica para agregar un nuevo alumno
  }

  agregarRutina(): void {
    console.log('Agregar nueva rutina');
    // Lógica para agregar una nueva rutina
  }

  alternarModoOscuro(): void {
    this.modoOscuro = !this.modoOscuro;
  }
}
