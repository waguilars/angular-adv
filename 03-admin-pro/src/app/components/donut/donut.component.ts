import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [],
})
export class DonutComponent implements OnInit {
  @Input() title = 'Sin Titulo';
  // Doughnut
  @Input() chartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input() chartData: MultiDataSet = [[350, 450, 100]];
  @Input() colors: Color[] = [
    { backgroundColor: ['#ff5e5b', '#D8D8D8', '#00CECB'] },
  ];

  constructor() {}

  ngOnInit(): void {}
}
