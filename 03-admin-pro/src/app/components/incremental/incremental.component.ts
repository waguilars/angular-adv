import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incremental',
  templateUrl: './incremental.component.html',
  styles: [],
})
export class IncrementalComponent implements OnInit {
  @Input() value: number;
  @Input() btnClass = 'btn btn-primary';
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.value = 50;
  }
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeValue(newValue: number): number {
    this.value = this.value + newValue;

    if (this.value >= 100) {
      this.valueChange.emit(100);
      return (this.value = 100);
    }

    if (this.value <= 0) {
      this.valueChange.emit(0);
      return (this.value = 0);
    }

    this.valueChange.emit(this.value);
    return this.value;
  }

  onChange(value: number): void {
    if (value > 100) {
      this.value = 100;
    } else if (value < 0 || !value) {
      this.value = 0;
    } else {
      this.value = value;
    }

    this.valueChange.emit(this.value);
  }
}
