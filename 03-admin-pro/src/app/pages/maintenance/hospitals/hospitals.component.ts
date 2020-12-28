import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public tempHospitals: Hospital[] = [];

  public searchTerm: string;
  public loading = false;
  private imgSubs$: Subscription;

  constructor(
    private hospitalSv: HospitalService,
    private searchSv: SearchService,
    private modalSv: ModalService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs$.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();

    this.imgSubs$ = this.modalSv.newImage$.subscribe((img) =>
      this.loadHospitals()
    );
  }

  loadHospitals(): void {
    this.loading = true;
    this.hospitalSv.loadHospitals().subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.tempHospitals = hospitals;
      this.loading = false;
    });
  }

  search(term: string): Hospital[] {
    if (term.length === 0) {
      return (this.hospitals = this.tempHospitals);
    }

    this.searchSv.search('hospitals', term).subscribe((results: Hospital[]) => {
      this.hospitals = results;
    });
  }

  saveChanges(hospital: Hospital): void {
    this.hospitalSv
      .updateHospiral(hospital._id, hospital.name)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital): void {
    this.hospitalSv.deleteHospital(hospital._id).subscribe((resp) => {
      this.loadHospitals();
      Swal.fire('Borrado', hospital.name, 'success');
    });
  }

  async showNewHospitalDialog(): Promise<any> {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital.',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital',
    });

    if (value.trim().length > 0) {
      this.hospitalSv.createHospiral(value).subscribe((resp) => {
        this.hospitals.push(resp.hospital);
      });
    }
  }

  showModal(hospital: Hospital): void {
    this.modalSv.showModal('hospitals', hospital.img, hospital._id);
  }
}
