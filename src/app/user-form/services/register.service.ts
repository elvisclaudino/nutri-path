import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  userRegister(usuario: User): Observable<User | null> {
    return this.http.post<User>(this.apiUrl, usuario);
  }

  verifyEmail(email: string): Observable<boolean> {
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      delay(2000),
      map((dados: User[]) => dados.some((user) => user.email === email))
    );
  }
}
