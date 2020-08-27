import { Component } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styles: [],
})
export class Chart1Component {
  labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  data1 = [[25, 50, 100]];
}
