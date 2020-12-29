import { Injectable, NgZone, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';
import { LoadUsers } from '../interfaces/responses.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.initGoogle();
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          localStorage.setItem('token', resp.token);
          const { role, google, name, email, img, uid } = resp.user;
          this.user = new User(name, email, null, img, google, uid, role);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  createUser(formData: RegisterForm): Observable<any> {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );
  }

  updateProfile(data: {
    name: string;
    email: string;
    role: string;
  }): Observable<any> {
    data = {
      ...data,
      role: this.user.role,
    };
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

  saveUser(user: User): Observable<any> {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );
  }

  initGoogle(): Promise<any> {
    return new Promise((resolve) => {
      // console.log('google init');
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '583785517855-nn3760eh2pcleueq0d33ch5hsicflt0a.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve(this.auth2);
      });
    });
  }

  loginGoogle(token: string): Observable<any> {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });

      // console.log('User signed out.');
    });
  }

  loadUsers(from: number = 0): Observable<LoadUsers> {
    const url = `${base_url}/users?from=${from}`;

    return this.http.get<LoadUsers>(url, this.headers).pipe(
      // delay(1000),
      map((resp) => {
        const users = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              null,
              user.img,
              user.google,
              user.uid,
              user.role
            )
        );
        resp.users = users;
        return resp;
      })
    );
  }

  deleteUser(user: User): Observable<any> {
    const url = `${base_url}/users/${user.uid}`;

    return this.http.delete(url, this.headers);
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get menu(): any {
    return localStorage.getItem('menu');
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get role(): string {
    return this.user.role;
  }

  get headers(): object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
}
