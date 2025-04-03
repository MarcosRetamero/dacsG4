import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkoutService, Exercise, Routine, ExerciseImage } from 'src/app/core/services/routine.service';

// Local interface for managing exercises during routine creation
interface RoutineCreation extends Routine {
  exercises?: Exercise[];
}

type RoutineCreateDTO = Omit<Routine, 'id'>;

@Component({
  selector: 'app-create-routine',
  templateUrl: './agregar-ejercicios.component.html',
  styleUrls: ['./agregar-ejercicios.component.css']
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
    private authService: AuthService
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
      reps: [null, [Validators.required, Validators.min(1)]]
    });

    this.routine = {
      id: 0,
      userId: '',
      routineName: '',
      day: 0,
      exercises: []
    };
  }

  private loadExercises(): void {
    this.workoutService.getAvailableExercises().subscribe({
      next: (exerciseImages: ExerciseImage[]) => {
        this.availableExercises = exerciseImages.map((exerciseData: ExerciseImage) => ({
          id: exerciseData.exercise.id,
          name: exerciseData.exercise.name,
          description: exerciseData.exercise.description,
          sets: 3,
          reps: 10,
          image: exerciseData.image?.image ?? '',
          routineId: 0
        }));
      },
      error: (error) => {
        console.error('Error al obtener los ejercicios:', error);
        this.availableExercises = [];
      }
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

      this.routine.day = historyData.day;

      this.routine.exercises = historyData.ejercicios.map((ejercicio: HistoryExerciseData) => ({
        id: ejercicio.id ?? Math.random(),
        name: ejercicio.name,
        description: ejercicio.description,
        sets: ejercicio.sets,
        reps: ejercicio.reps,
        image: ejercicio.image ?? '',
        routineId: ejercicio.routineId ?? 0
      }));

      this.routineForm.patchValue({ day: historyData.day });
    } else {
      console.log('No se recibieron datos en agregar-ejercicios');
    }
  }

  selectExercise(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedExercise = this.availableExercises.find(e => e.id === Number(selectedValue)) || null;
  }

  addExerciseToRoutine(): void {
    if (this.selectedExercise) {
      if (!this.routine.exercises) this.routine.exercises = [];

      const existingIndex = this.routine.exercises.findIndex(e => e.id === this.selectedExercise!.id);
      const newExercise = {
        ...this.selectedExercise,
        sets: this.routineForm.value.sets,
        reps: this.routineForm.value.reps
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
      this.routine.exercises = this.routine.exercises.filter(e => e.id !== id);
    }
  }

  saveRoutine(): void {
    const exercisesLength = this.routine.exercises?.length ?? 0;
    const isValid =
      this.routineForm.get('routineName')?.valid &&
      this.routineForm.get('day')?.valid &&
      exercisesLength > 0;

    console.log('➡ Validando rutina...');
    console.log('Formulario válido:', this.routineForm.valid);
    console.log('Ejercicios cargados:', exercisesLength);
    console.log('Form values:', this.routineForm.value);

    if (isValid) {
      const routineToCreate: RoutineCreateDTO = {
        userId: this.routine.userId,
        routineName: this.routineForm.value.routineName,
        day: Number(this.routineForm.value.day)
      };

      console.log('➡ Enviando rutina al backend:', routineToCreate);

      this.workoutService.createRoutine(routineToCreate).subscribe(
        (createdRoutine) => {
          console.log('✅ Rutina creada con ID:', createdRoutine.id);

          const exerciseCreationPromises = this.routine.exercises!.map((exercise, index) => {
            const exerciseToCreate: Exercise = {
              ...exercise,
              routineId: createdRoutine.id
            };

            console.log(`➡ Enviando ejercicio #${index + 1}:`, exerciseToCreate);
            return this.workoutService.createExercise(exerciseToCreate).toPromise();
          });

          Promise.all(exerciseCreationPromises)
            .then(() => {
              console.log('✅ Todos los ejercicios creados exitosamente');
              this.resetRoutineForm();
              this.showExerciseForm = false;
              this.isDayDisabled = false;
            })
            .catch(error => {
              console.error('❌ Error al crear los ejercicios:', error);
            });
        },
        (error) => console.error('❌ Error al crear la rutina:', error)
      );
    } else {
      console.log('❌ No se pudo guardar la rutina. Asegúrate de completar todos los campos.');
    }
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
      exercises: []
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
      reps: exercise.reps
    });
  }
}
