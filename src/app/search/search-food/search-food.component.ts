import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { foodSearch } from 'src/app/shared/models/foodSearch';

import { FoodSearchService } from 'src/app/shared/services/food-search.service';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss'],
})
export class SearchFoodComponent {
  foods$!: Observable<foodSearch[]>;

  constructor(private foodSearchService: FoodSearchService) {}

  onSearchTextChanged(searchTerm: string) {
    this.foods$ = this.foodSearchService.getFoodsSearch(searchTerm);
  }
}
