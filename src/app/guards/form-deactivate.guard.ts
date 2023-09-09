import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';

import { IFormCanDeactivate } from './iform-candeactivate';

@Injectable()
export class FormDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {
  canDeactivate(
    component: IFormCanDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
