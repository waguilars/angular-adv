import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
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
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Usuarios del sistema',
          section: 'Mantenimiento',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
