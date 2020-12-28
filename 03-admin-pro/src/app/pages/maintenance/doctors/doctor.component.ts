import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];

  public selectedDoctor: Doctor;
  public selectedHospital: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalSv: HospitalService,
    private doctorSv: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => this.loadDoctor(id));
    // console.log('object');

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.doctorForm.get('hospital').valueChanges.subscribe((hospId) => {
      this.selectedHospital = this.hospitals.find((h) => h._id === hospId);
      // console.log(this.selectedHospital);
    });

    this.loadHospitals();
  }

  loadHospitals(): void {
    this.hospitalSv.loadHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  loadDoctor(id: string): void {
    if (id === 'new') {
      return;
    }

    this.doctorSv
      .getDoctorById(id)
      .pipe(delay(100))
      .subscribe((doc) => {
        if (!doc) {
          return this.router.navigateByUrl('/dashboard/doctors');
        }

        const {
          name,
          hospital: { _id },
        } = doc;
        this.selectedDoctor = doc;

        this.doctorForm.setValue({ name, hospital: _id });
      });
  }

  saveDoctor(): void {
    const { name } = this.doctorForm.value;

    if (this.selectedDoctor) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id,
      };
      this.doctorSv.updateDoctor(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${name} actualizado correctamente`,
          'success'
        );
      });
    } else {
      this.doctorSv.createDoctor(this.doctorForm.value).subscribe((resp) => {
        Swal.fire('Médico creado', `${name} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`);
      });
    }
  }
}
