import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbddComponent } from './testbdd.component';

describe('TestbddComponent', () => {
  let component: TestbddComponent;
  let fixture: ComponentFixture<TestbddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestbddComponent]
    });
    fixture = TestBed.createComponent(TestbddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
