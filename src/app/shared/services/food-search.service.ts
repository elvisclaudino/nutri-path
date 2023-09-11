import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foods } from '../models/foods';

@Injectable({
  providedIn: 'root',
})
export class FoodSearchService {
  constructor(private http: HttpClient) {}

  getFoods() {
    return this.http.get<Foods[]>('assets/data/foods.json');
  }
}
