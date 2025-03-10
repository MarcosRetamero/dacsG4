import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutineComponent } from './agregar-ejercicios.component';

describe('AgregarEjerciciosComponent', () => {
  let component: CreateRoutineComponent;
  let fixture: ComponentFixture<CreateRoutineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoutineComponent]
    });
    fixture = TestBed.createComponent(CreateRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
