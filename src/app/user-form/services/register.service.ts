import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  userRegister(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  verifyEmail(email: string): Observable<boolean> {
    return this.http.get<any>('http://localhost:3000/users').pipe(
      delay(2000),
      map((dados: any[]) => dados.some((user) => user.email === email))
    );
  }
}
