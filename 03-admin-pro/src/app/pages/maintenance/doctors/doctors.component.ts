import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from './../../../services/doctor.service';
import { ModalService } from '../../../services/modal.service';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public loading = true;
  public doctors: Doctor[] = [];
  public tempDoctors: Doctor[] = [];
  private imgSubs$: Subscription;

  constructor(
    private doctorSv: DoctorService,
    private modalSv: ModalService,
    private searchSv: SearchService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();

    this.imgSubs$ = this.modalSv.newImage$.subscribe((img) =>
      this.loadDoctors()
    );
  }

  ngOnDestroy(): void {
    this.imgSubs$.unsubscribe();
  }

  loadDoctors(): void {
    this.doctorSv.loadDoctors().subscribe((docs) => {
      this.loading = false;
      this.doctors = docs;
      this.tempDoctors = docs;
    });
  }

  search(term: string): Doctor[] {
    if (term.length === 0) {
      return (this.doctors = this.tempDoctors);
    }

    this.searchSv.search('doctors', term).subscribe((results: Doctor[]) => {
      this.doctors = results;
    });
  }

  deleteDoctor(doctor: Doctor): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas a punto de eliminar a ${doctor.name} del sistema.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorSv.deleteDoctor(doctor._id).subscribe((resp) => {
          this.loadDoctors();
          Swal.fire(
            'Usuario eliminado!',
            `${doctor.name} fue eliminado correctamente.`,
            'success'
          );
        });
      }
    });
  }

  showModal(doctor: Doctor): void {
    this.modalSv.showModal('doctors', doctor.img, doctor._id);
  }
}
