import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private apiUrl = 'http://localhost:3000/dieta';

  constructor(private http: HttpClient) {}

  addFoodToDiet(food: any) {
    return this.http.post(this.apiUrl, food);
  }
}
