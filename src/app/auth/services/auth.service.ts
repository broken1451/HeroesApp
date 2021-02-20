import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Auth } from '../pages/interfaces/auth.interface';
import { tap, map } from 'rxjs/operators';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: Auth | undefined;

  get userAuth(): Auth {
    return { ...this._user! };
  }
  constructor(private httpClient: HttpClient) {}

  login(): Observable<Auth> {
    return this.httpClient.get<Auth>(`${URL}/usuarios/1`).pipe(
      tap((user) => {
        this._user = user;
      }),
      tap((user) => {
        localStorage.setItem('token', user.id);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this._user = undefined;
  }

  verificaAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      // return false;
      return of(false);
    } else {
      // return true;
      // return of(true);
      return this.httpClient.get<Auth>(`${URL}/usuarios/1`).pipe(
        map((auth) => {
          console.log('map', { auth });
          this._user = auth;
          return true;
        })
      );
    }
  }
}
