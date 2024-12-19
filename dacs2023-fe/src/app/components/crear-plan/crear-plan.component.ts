import { Component } from '@angular/core';

interface Ejercicio {
  nombre: string;
  repeticiones: number;
  series: number;
}

interface Dia {
  grupoMuscular: string;
  diaSemana: string;
  ejercicios: Ejercicio[];
}

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent {
  nombrePlan: string = '';
  cantidadDias: number = 0;
  dias: Dia[] = [];
  ejercicioActual: Ejercicio = { nombre: '', repeticiones: 0, series: 0 };
  diaSeleccionado: number | null = null;
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  isDarkMode: boolean = false;

  generarDias() {
    this.dias = Array(this.cantidadDias).fill(null).map(() => ({
      grupoMuscular: '',
      diaSemana: '',
      ejercicios: []
    }));
  }

  agregarEjercicio(diaIndex: number) {
    if (this.diaSeleccionado !== null) {
      this.dias[diaIndex].ejercicios.push(this.ejercicioActual);
      this.ejercicioActual = { nombre: '', repeticiones: 0, series: 0 };
      this.diaSeleccionado = null;
    }
  }

  eliminarEjercicio(diaIndex: number, ejercicioIndex: number) {
    this.dias[diaIndex].ejercicios.splice(ejercicioIndex, 1);
  }

  setDiaSeleccionado(diaIndex: number) {
    this.diaSeleccionado = diaIndex;
  }

  guardarPlan() {
    console.log('Plan guardado:', { nombrePlan: this.nombrePlan, cantidadDias: this.cantidadDias, dias: this.dias });
    // Aquí iría la lógica para guardar el plan en el backend
  }


  // Método para alternar entre modo claro y oscuro
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode); // Cambia la clase 'dark-mode' en el body
  }
}