import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  startWith,
} from 'rxjs';
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
