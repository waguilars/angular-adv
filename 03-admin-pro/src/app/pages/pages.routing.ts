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

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'main',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'PorgressBar' },
      },
      {
        path: 'charts',
        component: Chart1Component,
        data: { title: 'Graficos' },
      },
      {
        path: 'account-settings',
        component: AccoutSettingsComponent,
        data: { title: 'Ajustes' },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promesas' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Mi Perfil' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
