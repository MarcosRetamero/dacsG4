import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

type Exercise = {
  name: string;
  sets: number;
  reps: number;
  imageUrl?: string;
};

type TrainingDay = {
  day: string;
  muscleGroups: string;
  exercises: Exercise[];
};

@Component({
  selector: 'app-plan-entrenamiento',
  templateUrl: './plan-entrenamiento.component.html',
  styleUrls: ['./plan-entrenamiento.component.css']

})
export class PlanEntrenamientoComponent implements OnInit {
  trainingPlan: TrainingDay[] = [
    {
      day: 'Lunes',
      muscleGroups: 'Pecho y tríceps',
      exercises: [
        { name: 'Press de banca', sets: 4, reps: 10, imageUrl: 'assets/images/press_banca.jpg' },
        { name: 'Aperturas con mancuernas', sets: 3, reps: 12, imageUrl: 'assets/images/aperturas_mancuernas.jpg' },
        { name: 'Fondos', sets: 3, reps: 15 },
      ],
    },
    {
      day: 'Martes',
      muscleGroups: 'Piernas y glúteos',
      exercises: [
        { name: 'Sentadillas', sets: 4, reps: 12 },
        { name: 'Peso muerto', sets: 3, reps: 10 },
      ],
    }
  ];

  filteredPlan: TrainingDay | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const selectedDay = params['day'];
      this.filteredPlan = this.trainingPlan.find(day => day.day === selectedDay);
    });
  }
}
