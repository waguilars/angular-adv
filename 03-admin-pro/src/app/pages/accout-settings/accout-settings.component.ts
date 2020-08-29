import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: [],
})
export class AccoutSettingsComponent implements OnInit {
  links: NodeListOf<Element>;

  constructor(private ss: SettingsService) {}

  ngOnInit(): void {
    this.ss.checkCurrentTheme();
  }

  changeTheme(theme: string): void {
    this.ss.changeTheme(theme);
  }
}
