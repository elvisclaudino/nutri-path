import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  userLogin(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((dados: User[]) => {
        const user = dados.find((user: User) => {
          return user.email === email && user.password === password;
        });

        if (!user) {
          throw new Error('Usuário não encontrado');
        }

        return user;
      }),
      catchError((error) => {
        console.error('Erro ao fazer login: ', error);
        throw error;
      })
    );
  }
}
