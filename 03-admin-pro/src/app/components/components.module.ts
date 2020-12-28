import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementalComponent } from './incremental/incremental.component';
import { DonutComponent } from './donut/donut.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [IncrementalComponent, DonutComponent, ImageModalComponent],
  imports: [CommonModule, FormsModule, ChartsModule, PipesModule],
  exports: [IncrementalComponent, DonutComponent, ImageModalComponent],
})
export class ComponentsModule {}
