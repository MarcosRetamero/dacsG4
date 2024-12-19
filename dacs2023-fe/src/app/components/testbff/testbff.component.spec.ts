import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBffComponent } from './testbff.component';

describe('TestbffComponent', () => {
  let component: TestBffComponent;
  let fixture: ComponentFixture<TestBffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestBffComponent]
    });
    fixture = TestBed.createComponent(TestBffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
