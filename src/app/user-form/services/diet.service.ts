import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private apiUrl = 'http://localhost:3000/dieta';

  constructor(private http: HttpClient) {}

  addFoodToDiet(food: any) {
    return this.http.post(this.apiUrl, food);
  }

  getDietSortedByTime(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((diet) =>
        diet.sort((a, b) => {
          return a.time.localeCompare(b.time);
        })
      )
    );
  }
}
