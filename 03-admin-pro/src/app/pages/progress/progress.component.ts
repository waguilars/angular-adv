import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progress1 = 25;
  progress2 = 35;

  get getProgress1(): number {
    return this.progress1;
  }
  get getProgress2(): number {
    return this.progress2;
  }
}
