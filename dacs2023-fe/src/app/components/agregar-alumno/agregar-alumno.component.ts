import { Component } from '@angular/core';

type Alumno = {
  id: number;
  nombre: string;
  edad: number;
  pesoActual: number;
};

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent {
  filtro: string = '';
  seleccionado: Alumno | null = null;

  alumnos: Alumno[] = [
    { id: 1, nombre: 'Ana García', edad: 20, pesoActual: 55 },
    { id: 2, nombre: 'Carlos López', edad: 22, pesoActual: 70 },
    { id: 3, nombre: 'María Rodríguez', edad: 21, pesoActual: 58 },
    { id: 4, nombre: 'Juan Martínez', edad: 23, pesoActual: 75 },
    { id: 5, nombre: 'Laura Sánchez', edad: 20, pesoActual: 60 }
  ];

  get alumnosFiltrados(): Alumno[] {
    return this.alumnos.filter((alumno) =>
      alumno.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  seleccionarAlumno(alumno: Alumno): void {
    this.seleccionado = alumno;
  }

  confirmarAlumno(): void {
    if (this.seleccionado) {
      console.log('Alumno confirmado:', this.seleccionado);
    }
  }
}
