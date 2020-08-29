import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'main', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'charts', component: Chart1Component },
      { path: 'account-settings', component: AccoutSettingsComponent },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
