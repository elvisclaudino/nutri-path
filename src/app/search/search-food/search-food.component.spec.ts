import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodComponent } from './search-food.component';

describe('SearchFoodComponent', () => {
  let component: SearchFoodComponent;
  let fixture: ComponentFixture<SearchFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFoodComponent]
    });
    fixture = TestBed.createComponent(SearchFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
