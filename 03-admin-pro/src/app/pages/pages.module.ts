import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { PagesComponent } from './pages.component';
import { Chart1Component } from './chart1/chart1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
  ],
})
export class PagesModule {}
