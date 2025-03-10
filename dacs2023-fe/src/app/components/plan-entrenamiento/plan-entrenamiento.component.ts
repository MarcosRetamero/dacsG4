import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type Exercise = {
  name: string;
  description: string;
  sets: number;
  reps: number;
  imageUrl?: string; // URL de la imagen proporcionada por la API
};

type Routine = {
  day: string;
  routineName: string;
  exercises: Exercise[];
};

@Component({
  selector: 'app-plan-entrenamiento',
  templateUrl: './plan-entrenamiento.component.html',
  styleUrls: ['./plan-entrenamiento.component.css'],
})
export class PlanEntrenamientoComponent implements OnInit {
  constructor(private router: Router) {}

  Routine: Routine = {
    day: '',
    routineName: 'Cardio',
    exercises: [
      {
        name: 'Press plano',
        description: 'Descripcion del ejercicio',
        sets: 4,
        reps: 12,
        imageUrl:
          'https://wger.de/media/exercise-images/192/Bench-press-1.png',
      },
      {
        name: 'Abdominales',
        description: 'Descripcion del ejercicio',
        sets: 3,
        reps: 10,
        imageUrl:
          'https://wger.de/media/exercise-images/91/Crunches-1.png',
      },
      {
        name: 'Curl de biceps con barra',
        description: 'Descripcion del ejercicio',
        sets: 3,
        reps: 12,
        imageUrl:
          'https://wger.de/media/exercise-images/74/Bicep-curls-1.png',
      },
    ],
  };

  Atras() {
    this.router.navigate(['/dashboard-cliente']);
  }

  EliminarRutina() {
    this.router.navigate(['/dashboard-cliente']);
  }

  EditarRutina() {
    // Creamos el objeto con los datos a enviar
    const datosEjercicios = {
      dia: this.Routine.day,
      ejercicios: this.Routine.exercises.map((exercise) => ({
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets,
        reps: exercise.reps,
      })),
    };

    // Log de los datos que vamos a enviar
    console.log('Datos a enviar a agregar-ejercicios:');
    console.log('- Día:', datosEjercicios.dia);
    console.log('- Ejercicios:', datosEjercicios.ejercicios);

    // Navegamos a agregar-ejercicios con los datos
    this.router.navigate(['/agregar-ejercicios'], {
      state: { datosEjercicios },
    });
  }

  ngOnInit() {
    console.log('History state en plan-entrenamiento:', history.state);

    if (history.state?.datosRutina) {
      console.log('Datos recibidos en plan-entrenamiento:');
      console.log(
        '- Día seleccionado:',
        history.state.datosRutina.diaSeleccionado
      );

      this.Routine.day = history.state.datosRutina.diaSeleccionado;
    } else {
      console.log('No se recibieron datos en plan-entrenamiento');
      this.Routine.day = 'Lunes';
    }
  }
}
