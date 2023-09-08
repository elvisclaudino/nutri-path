import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId: number | null = null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  setUserId(id: number) {
    this.userId = id;
    this.isLoggedInSubject.next(true);
  }

  getUserId(): number | null {
    return this.userId;
  }

  isLoggedIn$() {
    return this.isLoggedInSubject.asObservable();
  }

  logout() {
    this.userId = null;
    this.isLoggedInSubject.next(false);
  }
}
