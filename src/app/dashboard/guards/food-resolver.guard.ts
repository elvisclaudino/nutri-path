import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { DietService } from './../services/diet.service';
import { Foods } from 'src/app/shared/models/foods';

@Injectable({
  providedIn: 'root',
})
export class FoodResolverGuard implements Resolve<Foods> {
  constructor(private dietService: DietService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Foods | Observable<Foods> | Promise<Foods> {
    if (route.params && route.params['id']) {
      return this.dietService.loadById(route.params['id']);
    }

    return of({
      id: 0,
      name: '',
      quantity: '',
      kcal: '',
      time: '',
      category: '',
      foodId: 0,
      userId: 0,
    });
  }
}
