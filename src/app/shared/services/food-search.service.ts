import { foodSearch } from './../models/foodSearch';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodSearchService {
  constructor(private http: HttpClient) {}

  getFoods() {
    return this.http
      .get<foodSearch[]>('assets/data/foods.json')
      .pipe(map((foods) => foods.sort((a, b) => a.nome.localeCompare(b.nome))));
  }

  getFoodsSearch(searchTerm: string = '') {
    return this.http.get<foodSearch[]>('assets/data/foods.json').pipe(
      map((foods) =>
        foods
          .filter((food) =>
            food.nome.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => a.nome.localeCompare(b.nome))
      ),
      catchError((error) => {
        console.error('Erro ao buscar alimentos:', error);
        return throwError('Ocorreu um erro ao buscar alimentos.');
      })
    );
  }
}
