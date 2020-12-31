import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    let params = new HttpParams().append('page', '1');
    params = params.append('name', 'wilson');

    return this.http
      .get('https://reqresa.in/api/user', {
        params,
        // headers,
      })
      .pipe(map((resp: any) => resp.data));
  }
}
