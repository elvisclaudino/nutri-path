import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { DietService } from './../services/diet.service';

@Injectable({
  providedIn: 'root',
})
export class FoodResolverGuard implements Resolve<any> {
  constructor(private dietService: DietService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> | Observable<any> {
    if (route.params && route.params['id']) {
      return this.dietService.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      quantity: null,
      kcal: null,
      catehory: null,
      time: null,
    });
  }
}
