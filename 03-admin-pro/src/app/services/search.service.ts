import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(
    type: 'users' | 'doctors' | 'hospitals',
    term: string
  ): Observable<User[] | Hospital[] | Doctor[]> {
    const url = `${base_url}/all/collection/${type}/${term}`;
    return this.http.get(url, this.headers).pipe(
      map((res: { ok: boolean; results: any[] }) => {
        let data: User[] | Hospital[] | Doctor[];
        switch (type) {
          case 'users':
            data = res.results.map(
              (item: User) =>
                new User(
                  item.name,
                  item.email,
                  null,
                  item.img,
                  item.google,
                  item.uid,
                  item.role
                )
            );
            break;

          case 'hospitals':
            data = res.results;
            break;

          case 'doctors':
            data = res.results;
            break;

          default:
            data = [];
        }
        return data;
      })
    );
  }

  globalSearch(term: string): Observable<any> {
    const url = `${base_url}/all/${term}`;
    return this.http.get(url, this.headers);
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
}
