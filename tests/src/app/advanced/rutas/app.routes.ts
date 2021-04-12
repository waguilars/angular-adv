import { Routes } from "@angular/router";
import { HospitalComponent } from '../../medium2/hospital/hospital.component';
import { IncrementadorComponent } from '../../medium2/incrementador/incrementador.component';
import { MedicoComponent } from '../../medium2/medico/medico.component';

export const RUTAS: Routes = [
  { path: 'hospital' , component: HospitalComponent},
  { path: 'medico/:id' , component: MedicoComponent},
  { path: '**' , component: IncrementadorComponent},
];