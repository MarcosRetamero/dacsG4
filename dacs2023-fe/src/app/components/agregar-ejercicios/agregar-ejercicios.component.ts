import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  WorkoutService,
  Exercise,
  Routine,
  ExerciseImage,
} from 'src/app/core/services/routine.service';

// Local interface for managing exercises during routine creation
interface RoutineCreation extends Routine {
  exercises?: Exercise[];
}

type RoutineCreateDTO = Omit<Routine, 'id'>;

@Component({
  selector: 'app-create-routine',
  templateUrl: './agregar-ejercicios.component.html',
  styleUrls: ['./agregar-ejercicios.component.css'],
})
export class CreateRoutineComponent implements OnInit {
  routineForm!: FormGroup;
  availableExercises: Exercise[] = [];
  selectedExercise: Exercise | null = null;
  showExerciseForm = false;
  isDayDisabled = false;
  routine!: RoutineCreation;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.authService.getUserId().subscribe((userId) => {
      if (!userId) {
        console.error('❌ No se pudo obtener el ID del usuario');
        return;
      }

      console.log('✅ ID obtenido desde token:', userId);
      this.routine.userId = userId;

      this.loadExercises();
      this.loadHistoryState();
    });
  }

  private initializeForm(): void {
    this.routineForm = this.fb.group({
      routineName: ['', Validators.required],
      day: [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      sets: [null, [Validators.required, Validators.min(1)]],
      reps: [null, [Validators.required, Validators.min(1)]],
    });

    this.routine = {
      id: 0,
      userId: '',
      routineName: '',
      day: 0,
      exercises: [],
    };
  }

  private loadExercises(): void {
    this.workoutService.getAvailableExercises().subscribe({
      next: (exerciseImages: ExerciseImage[]) => {
        this.availableExercises = exerciseImages.map(
          (exerciseData: ExerciseImage) => ({
            id: exerciseData.exercise.id,
            name: exerciseData.exercise.name,
            description: exerciseData.exercise.description,
            sets: 3,
            reps: 10,
            image: exerciseData.image?.image ?? '',
            routineId: 0,
          })
        );
      },
      error: (error) => {
        console.error('Error al obtener los ejercicios:', error);
        this.availableExercises = [];
      },
    });
  }

  private loadHistoryState(): void {
    interface HistoryExerciseData {
      name: string;
      description: string;
      sets: number;
      reps: number;
      id?: number;
      image?: string;
      routineId?: number;
    }

    interface HistoryStateData {
      day: number;
      ejercicios: HistoryExerciseData[];
    }

    if (history.state && 'datosEjercicios' in history.state) {
      const historyData = history.state.datosEjercicios as HistoryStateData;

      const dayNumber = Number(historyData.day);

      if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 7) {
        console.warn(
          '⚠ Día inválido recibido al editar rutina:',
          historyData.day
        );
        alert('⚠ No se pudo cargar la rutina porque el día es inválido.');
        return;
      }

      this.routine.day = dayNumber;
      this.routineForm.patchValue({ day: dayNumber });

      this.routine.exercises = historyData.ejercicios.map(
        (ejercicio: HistoryExerciseData) => ({
          id: ejercicio.id ?? Math.random(),
          name: ejercicio.name,
          description: ejercicio.description,
          sets: ejercicio.sets,
          reps: ejercicio.reps,
          image:
            typeof ejercicio.image === 'string'
              ? ejercicio.image
              : (ejercicio.image as any)?.image ?? '',
          routineId: ejercicio.routineId ?? 0,
        })
      );
    } else {
      console.log('No se recibieron datos en agregar-ejercicios');
    }
  }

  selectExercise(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedExercise =
      this.availableExercises.find((e) => e.id === Number(selectedValue)) ||
      null;
  }

  addExerciseToRoutine(): void {
    if (this.selectedExercise) {
      if (!this.routine.exercises) this.routine.exercises = [];

      const existingIndex = this.routine.exercises.findIndex(
        (e) => e.id === this.selectedExercise!.id
      );
      const newExercise = {
        ...this.selectedExercise,
        sets: this.routineForm.value.sets,
        reps: this.routineForm.value.reps,
      };

      if (existingIndex !== -1) {
        this.routine.exercises[existingIndex] = newExercise;
      } else {
        this.routine.exercises.push(newExercise);
      }

      this.resetExerciseForm();
    }
  }

  removeExercise(id: number): void {
    if (this.routine.exercises) {
      this.routine.exercises = this.routine.exercises.filter(
        (e) => e.id !== id
      );
    }
  }

  saveRoutine(): void {
    const exercisesLength = this.routine.exercises?.length ?? 0;
    const formValues = this.routineForm.value;

    // Validaciones específicas con mensajes claros
    if (!formValues.routineName) {
      alert('❌ Tenés que ingresar un nombre para la rutina.');
      return;
    }

    if (!formValues.day) {
      alert('❌ Tenés que seleccionar un día.');
      return;
    }

    if (exercisesLength === 0) {
      alert('❌ Agregá al menos un ejercicio.');
      return;
    }

    const dayToCheck = Number(formValues.day);

    if (isNaN(dayToCheck) || dayToCheck < 1 || dayToCheck > 7) {
      alert('❌ El día seleccionado no es válido.');
      return;
    }

    this.routine.day = dayToCheck;

    this.workoutService.getRoutinesByUserId(this.routine.userId).subscribe({
      next: (routines) => {
        const yaExiste = routines.some((r) => r.day === dayToCheck);

        if (yaExiste) {
          const diaNombre = this.getNombreDia(dayToCheck);
          alert(`⚠ Ya existe una rutina para el día ${diaNombre}`);
          return;
        }

        const routineToCreate: RoutineCreateDTO = {
          userId: this.routine.userId,
          routineName: formValues.routineName,
          day: dayToCheck,
        };

        this.workoutService.createRoutine(routineToCreate).subscribe(
          (createdRoutine) => {
            console.log('✅ Rutina creada con ID:', createdRoutine.id);

            const exerciseCreationPromises = this.routine.exercises!.map(
              (exercise) => {
                const exerciseToCreate: Exercise = {
                  ...exercise,
                  routineId: createdRoutine.id,
                };
                return this.workoutService
                  .createExercise(exerciseToCreate)
                  .toPromise();
              }
            );

            Promise.all(exerciseCreationPromises)
              .then(() => {
                alert('✅ Rutina creada correctamente');
                this.resetRoutineForm();
                this.showExerciseForm = false;
                this.isDayDisabled = false;
                this.router.navigate(['/dashboard-cliente']);
              })
              .catch((error) => {
                console.error('❌ Error al crear los ejercicios:', error);
                alert('❌ Ocurrió un error al crear los ejercicios.');
              });
          },
          (error) => {
            console.error('❌ Error al crear la rutina:', error);
            alert('❌ No se pudo crear la rutina.');
          }
        );
      },
      error: (error) => {
        console.error('❌ Error al verificar rutinas existentes:', error);
        alert('❌ No se pudieron verificar las rutinas del usuario.');
      },
    });
  }

  resetExerciseForm(): void {
    this.selectedExercise = null;
    this.routineForm.patchValue({ sets: null, reps: null });
    this.showExerciseForm = false;
    this.isDayDisabled = true;
  }

  resetRoutineForm(): void {
    this.routineForm.reset();
    this.routine = {
      id: 0,
      userId: '',
      routineName: '',
      day: 0,
      exercises: [],
    };
    this.isDayDisabled = false;
  }

  showExerciseFormHandler(): void {
    this.showExerciseForm = true;
    this.isDayDisabled = true;
  }

  editExercise(exercise: Exercise): void {
    this.selectedExercise = exercise;
    this.showExerciseForm = true;
    this.routineForm.patchValue({
      sets: exercise.sets,
      reps: exercise.reps,
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard-cliente']);
  }

  getNombreDia(numero: number): string {
    const dias = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
    return dias[numero - 1] || 'Día inválido';
  }
}
