import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foods } from '../models/foods';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodSearchService {
  constructor(private http: HttpClient) {}

  getFoods() {
    return this.http
      .get<Foods[]>('assets/data/foods.json')
      .pipe(map((foods) => foods.sort((a, b) => a.nome.localeCompare(b.nome))));
  }

  getFoodsSearch(searchTerm: string = '') {
    return this.http
      .get<Foods[]>('assets/data/foods.json')
      .pipe(
        map((foods) =>
          foods
            .filter((food) =>
              food.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => a.nome.localeCompare(b.nome))
        )
      );
  }
}
