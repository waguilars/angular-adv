import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';

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
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          localStorage.setItem('token', resp.token);
          const { role, google, name, email, img, uid } = resp.user;
          this.user = new User(name, email, null, img, google, uid, role);
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  createUser(formData: RegisterForm): Observable<any> {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
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
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });

      // console.log('User signed out.');
    });
  }
}
