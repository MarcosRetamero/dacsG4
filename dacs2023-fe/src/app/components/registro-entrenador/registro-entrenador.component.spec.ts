import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntrenadorComponent } from './registro-entrenador.component';

describe('RegistroEntrenadorComponent', () => {
  let component: RegistroEntrenadorComponent;
  let fixture: ComponentFixture<RegistroEntrenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroEntrenadorComponent]
    });
    fixture = TestBed.createComponent(RegistroEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
