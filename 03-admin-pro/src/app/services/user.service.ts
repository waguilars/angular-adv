import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
}
