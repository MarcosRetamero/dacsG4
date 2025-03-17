import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService, Exercise, Routine } from 'src/app/core/services/routine.service';

@Component({
  selector: 'app-plan-entrenamiento',
  templateUrl: './plan-entrenamiento.component.html',
  styleUrls: ['./plan-entrenamiento.component.css'],
})
export class PlanEntrenamientoComponent implements OnInit {
  routine: Routine = {
    id: 0,
    userId: '',
    day: 1,
    routineName: ''
  };
  exercises: Exercise[] = [];

  constructor(
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    console.log('History state en plan-entrenamiento:', history.state);

    interface HistoryRoutineData {
      diaSeleccionado: number | string;
      userId: string;
    }

    if (history.state && 'datosRutina' in history.state) {
      const historyData = history.state.datosRutina as HistoryRoutineData;

      if (historyData.userId) {
        this.routine.userId = historyData.userId;
      }

      this.routine.day = Number(historyData.diaSeleccionado) % 7;
      this.loadRoutine(this.routine.day);
    } else {
      console.log('No se recibieron datos en plan-entrenamiento');
      this.routine.day = 1;
    }
  }

  loadRoutine(day: number): void {
    if (!this.routine.userId) {
      console.error('No hay userId definido');
      return;
    }

    this.workoutService.getRoutinesByUserId(this.routine.userId).subscribe(
      (routines: Routine[]) => {
        const foundRoutine = routines.find(r => r.day === day);

        if (foundRoutine) {
          this.routine = foundRoutine;
          this.loadExercises(foundRoutine.id);
        } else {
          console.log('No hay rutina registrada para este día.');
          this.exercises = [];
        }
      },
      (error) => console.error('Error al obtener la rutina', error)
    );
  }

  loadExercises(routineId: number): void {
    this.workoutService.getExercisesByRoutineId(routineId).subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      },
      (error) => console.error('Error al obtener ejercicios', error)
    );
  }

  goBack(): void {
    this.router.navigate(['/dashboard-cliente']);
  }

  deleteRoutine(): void {
    if (!this.routine.id) {
      console.error('No hay ID de rutina para eliminar');
      return;
    }

    this.workoutService.deleteRoutine(this.routine.id).subscribe(
      () => {
        console.log('Rutina eliminada correctamente');
        this.router.navigate(['/dashboard-cliente']);
      },
      (error) => console.error('Error al eliminar la rutina', error)
    );
  }

  editRoutine(): void {
    if (!this.routine.id) {
      console.error('No hay ID de rutina para editar');
      return;
    }

    const datosEjercicios = {
      id: this.routine.id,
      day: this.routine.day,
      ejercicios: this.exercises.map((exercise: Exercise) => ({
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets,
        reps: exercise.reps,
        image: exercise.image || '',
        routineId: this.routine.id
      })),
    };

    this.router.navigate(['/agregar-ejercicios'], {
      state: { datosEjercicios },
    });
  }

  getDayName(day: number): string {
    const days = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo'
    ];
    const adjustedIndex = ((day - 1) % 7 + 7) % 7;
    return days[adjustedIndex] || 'Día no válido';
  }
}
