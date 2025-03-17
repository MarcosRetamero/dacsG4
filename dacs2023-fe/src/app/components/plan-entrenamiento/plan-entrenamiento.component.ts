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
    routineName: '',
    exercises: []
  };

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

      this.routine.day = Number(historyData.diaSeleccionado);
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
          this.routine.id = foundRoutine.id;
          this.routine.routineName = foundRoutine.routineName;
          this.routine.goal = foundRoutine.goal || 0;

          // If foundRoutine already has exercises, use them
          if (foundRoutine.exercises && foundRoutine.exercises.length > 0) {
            this.routine.exercises = foundRoutine.exercises;
          }
          // Otherwise fetch exercises separately
          else if (foundRoutine.id) {
            this.workoutService.getExercisesByRoutineId(foundRoutine.id).subscribe(
              (exercises: Exercise[]) => {
                this.routine.exercises = exercises;
              },
              (error) => console.error('Error al obtener ejercicios', error)
            );
          }
        } else {
          console.log('No hay rutina registrada para este día.');
          // Reset exercises when no routine is found
          this.routine.exercises = [];
        }
      },
      (error) => console.error('Error al obtener la rutina', error)
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
      dia: this.routine.day,
      ejercicios: this.routine.exercises!.map((exercise: Exercise) => ({
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets,
        reps: exercise.reps,
        image: exercise.image || '',
        routineId: exercise.routineId
      })),
    };

    this.router.navigate(['/agregar-ejercicios'], {
      state: { datosEjercicios },
    });
  }
}
