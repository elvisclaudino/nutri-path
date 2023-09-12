import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Foods } from 'src/app/shared/models/foods';

import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private apiUrl = 'http://localhost:3000/dieta';

  constructor(private http: HttpClient, private authService: AuthService) {}

  loadById(id: number): Observable<Foods> {
    return this.http.get<Foods>(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  addFoodToDiet(food: Foods) {
    return this.http.post(this.apiUrl, food).pipe(take(1));
  }

  updateFoodOnDiet(food: Foods) {
    return this.http.put(`${this.apiUrl}/${food.foodId}`, food).pipe(take(1));
  }

  save(food: Foods) {
    if (food.foodId) {
      return this.updateFoodOnDiet(food);
    }
    return this.addFoodToDiet(food);
  }

  removeFoodFromDiet(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  getDietSortedByTime(): Observable<Foods[]> {
    return this.http.get<Foods[]>(this.apiUrl).pipe(
      map((diet) =>
        diet
          .filter((food) => food.userId === this.authService.getUserId())
          .sort((a, b) => {
            return a.time.localeCompare(b.time);
          })
      )
    );
  }

  getDietSortByCategory(categoria: string): Observable<Foods[]> {
    return this.http.get<Foods[]>(this.apiUrl).pipe(
      map((diet) =>
        diet.filter((food) => {
          return (
            food.category === categoria &&
            food.userId === this.authService.getUserId()
          );
        })
      )
    );
  }
}
