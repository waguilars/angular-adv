import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      section: 'Dashboard',
      title: 'Main',
    },
  },
  {
    path: 'main',
    component: DashboardComponent,
    data: {
      section: 'Dashboard',
      title: 'Main',
    },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: {
      section: 'Dashboard',
      title: 'PorgressBar',
    },
  },
  {
    path: 'charts',
    component: Chart1Component,
    data: {
      section: 'Dashboard',
      title: 'Graficos',
    },
  },
  {
    path: 'account-settings',
    component: AccoutSettingsComponent,
    data: {
      section: 'Dashboard',
      title: 'Ajustes',
    },
  },
  {
    path: 'search/:term',
    component: SearchComponent,
    data: {
      section: 'Dashboard',
      title: 'Busqueda',
    },
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: {
      section: 'Dashboard',
      title: 'Promesas',
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      section: 'Dashboard',
      title: 'Mi Perfil',
    },
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    data: {
      section: 'Dashboard',
      title: 'RxJs',
    },
  },

  // maintenance
  {
    // admin
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: {
      title: 'Usuarios del sistema',
      section: 'Mantenimiento',
    },
  },

  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: {
      title: 'Hospitales',
      section: 'Mantenimiento',
    },
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: {
      title: 'Doctores',
      section: 'Mantenimiento',
    },
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    data: {
      title: 'Doctores',
      section: 'Mantenimiento',
    },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
