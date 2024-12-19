import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEntrenadorComponent } from './panel-entrenador.component';

describe('PanelEntrenadorComponent', () => {
  let component: PanelEntrenadorComponent;
  let fixture: ComponentFixture<PanelEntrenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelEntrenadorComponent]
    });
    fixture = TestBed.createComponent(PanelEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
