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
} from 'rxjs';
import { Foods } from 'src/app/shared/models/foods';
import { FoodSearchService } from 'src/app/shared/services/food-search.service';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss'],
})
export class SearchFoodComponent {
  searchField = new FormControl();
  foods$!: Observable<Foods[]>;

  constructor(private foodSearchService: FoodSearchService) {}

  ngOnInit(): void {
    this.foods$ = this.searchField.valueChanges.pipe(
      map((value) => value.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((searchTerm) =>
        this.foodSearchService
          .getFoods()
          .pipe(
            map((foods) =>
              foods.filter((food) =>
                food.nome.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
          )
      )
    );
  }
}
