import { Component } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent {
student = {
  name: 'Ana García',
  age: 28,
  email: 'ana.garcia@email.com',
  phone: '+34 123 456 789',
  startDate: '01/01/2023',
  currentPlan: 'Plan Básico de Fuerza',
  measurements: {
    weight: 65, // Peso en kg
    height: 165, // Altura en cm
    bodyFat: 22, // Porcentaje de grasa corporal
  },
};
  selectedPlan: string = '';
  availablePlans = [
    { id: 'plan1', name: 'Plan Básico de Fuerza' },
    { id: 'plan2', name: 'Plan Intermedio de Hipertrofia' },
    { id: 'plan3', name: 'Plan Avanzado de Resistencia' },
    { id: 'plan4', name: 'Plan de Pérdida de Peso' },
  ];

  isDarkMode: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const container = document.querySelector('.panel-entrenador');
    if (this.isDarkMode) {
      container?.classList.add('dark-mode');
    } else {
      container?.classList.remove('dark-mode');
    }
  }

  handleAssignPlan() {
    console.log(`Asignando plan ${this.selectedPlan} a ${this.student.name}`);
  }
}
