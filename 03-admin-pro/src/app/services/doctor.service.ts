import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Doctor } from '../models/doctor.model';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  loadDoctors(): Observable<Doctor[]> {
    const url = `${base_url}/doctors`;

    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; doctors: Doctor[] }) => resp.doctors));
  }

  getDoctorById(id: string): Observable<any> {
    const url = `${base_url}/doctors/${id}`;

    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; doctor: Doctor }) => resp.doctor));
  }

  createDoctor(doctor: { name: string; hospital: string }): Observable<any> {
    const url = `${base_url}/doctors`;

    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor): Observable<any> {
    const url = `${base_url}/doctors/${doctor._id}`;

    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(_id: string): Observable<any> {
    const url = `${base_url}/doctors/${_id}`;

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
