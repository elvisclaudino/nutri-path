import { TestBed } from '@angular/core/testing';

import { FoodSearchService } from './food-search.service';

describe('FoodSearchService', () => {
  let service: FoodSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
