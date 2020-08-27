import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementalComponent } from './incremental/incremental.component';
import { DonutComponent } from './donut/donut.component';

@NgModule({
  declarations: [IncrementalComponent, DonutComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
  exports: [IncrementalComponent, DonutComponent],
})
export class ComponentsModule {}
