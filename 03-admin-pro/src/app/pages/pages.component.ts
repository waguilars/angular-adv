import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function initApp(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private ss: SettingsService) {}

  ngOnInit(): void {
    initApp();
  }
}