import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private apiUrl = 'http://localhost:3000/dieta';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addFoodToDiet(food: any) {
    return this.http.post(this.apiUrl, food);
  }

  getDietSortedByTime(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((diet) =>
        diet
          .filter((food) => food.userId === this.authService.getUserId())
          .sort((a, b) => {
            return a.time.localeCompare(b.time);
          })
      )
    );
  }

  getDietSortByCategory(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
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
