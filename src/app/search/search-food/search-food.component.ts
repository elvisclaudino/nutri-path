import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Foods } from 'src/app/shared/models/foods';
import { FoodSearchService } from 'src/app/shared/services/food-search.service';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss'],
})
export class SearchFoodComponent {
  foods$!: Observable<Foods[]>;

  constructor(private foodSearchService: FoodSearchService) {}

  onSearchTextChanged(searchTerm: string) {
    this.foods$ = this.foodSearchService.getFoodsSearch(searchTerm);
  }
}
