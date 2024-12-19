// bdd.model.ts

export interface KeycloakUser {
    id: number;
    keycloakId: string;
    email: string;
    state: boolean;
  }
  
  export interface Trainer {
    id: number;
    specialty: string;
    name: string;
    age: number;
    userId: number;  // FK to KeycloakUser
  }
  
  export interface Customer {
    id: number;
    actualWeight: number;
    stature: number;
    age: number;
    name: string;
    assignedTrainingPlanId: number | null;  // FK to TrainingPlan, can be null
    assignedTrainerId: number | null;       // FK to Trainer, can be null
    userId: number;  // FK to KeycloakUser
  }
  
  export interface HistoricalProgress {
    id: number;
    date: string;  // Using ISO format date string
    weight: number;
    customerId: number;  // FK to Customer
  }
  
  export interface TrainingPlan {
    id: number;
    goal: string;
    daysInWeek: number;
    totalCustomers: number;
    trainerId: number;  // FK to Trainer
  }
  
  export interface CustomerPlan {
    customerId: number;  // FK to Customer
    planId: number;      // FK to TrainingPlan
  }
  
  export interface Exercise {
    id: number;
    name: string;
    description: string;
    image: string;
  }
  
  export interface TrainingRoutine {
    id: number;
    muscularGroup: string;
    weekday: number;
    planId: number;  // FK to TrainingPlan
  }
  
  export interface ExerciseRoutine {
    id: number;
    exerciseId: number;  // FK to Exercise
    trainingRoutineId: number;  // FK to TrainingRoutine
    sets: number;
    reps: number;
  }
  
  export interface BddResponse {
    keycloakUser: KeycloakUser;
    trainer: Trainer;
    customer: Customer;
    historicalProgress: HistoricalProgress;
    trainingPlan: TrainingPlan;
    customerPlan: CustomerPlan;
    exercise: Exercise;
    trainingRoutine: TrainingRoutine;
    exerciseRoutine: ExerciseRoutine;
  }
  