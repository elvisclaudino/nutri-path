import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaFormComponent } from './dieta-form.component';

describe('DietaFormComponent', () => {
  let component: DietaFormComponent;
  let fixture: ComponentFixture<DietaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietaFormComponent]
    });
    fixture = TestBed.createComponent(DietaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
