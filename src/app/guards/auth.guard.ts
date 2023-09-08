import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, delay } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.verifyAccess();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.verifyAccess();
  }

  private verifyAccess() {
    let isLogged = false;

    this.authService
      .isLoggedIn$()
      .subscribe((isLoggedIn) => (isLogged = isLoggedIn));
    if (isLogged) {
      return true;
    }

    Swal.fire(
      'Você não tem permissão!',
      'Faça seu login ou crie uma nova conta!',
      'error'
    );

    this.router.navigate(['/home/login']);
    return false;
  }
}
