import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  loadHospitals(): Observable<Hospital[]> {
    const url = `${base_url}/hospitals`;

    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; hospitals: Hospital[] }) => resp.hospitals)
      );
  }

  createHospiral(name: string): Observable<any> {
    const url = `${base_url}/hospitals`;

    return this.http.post(url, { name }, this.headers);
  }

  updateHospiral(_id: string, name: string): Observable<any> {
    const url = `${base_url}/hospitals/${_id}`;

    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(_id: string): Observable<any> {
    const url = `${base_url}/hospitals/${_id}`;

    return this.http.delete(url, this.headers);
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
