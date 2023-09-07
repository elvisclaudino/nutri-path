import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  userLogin(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((dados) => {
        const user = dados.find((user: any) => {
          return user.email === email && user.password === password;
        });
        return user || null;
      }),
      catchError((error) => {
        console.error('Erro ao fazer login: ', error);
        return error;
      })
    );
  }
}
