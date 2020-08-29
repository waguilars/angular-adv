import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private themeLink = document.querySelector('#theme');

  constructor() {
    const theme = localStorage.getItem('theme');
    const urlTheme = theme
      ? `./assets/css/colors/${theme}.css`
      : `./assets/css/colors/default.css`;
    this.themeLink.setAttribute('href', urlTheme);
  }

  changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.themeLink.setAttribute('href', url);

    localStorage.setItem('theme', theme);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const links = document.querySelectorAll('.selector');
    const currentThemeUrl = this.themeLink.getAttribute('href');

    links.forEach((el) => {
      el.classList.remove('working');
      const btnTheme = el.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      if (btnThemeUrl === currentThemeUrl) {
        el.classList.add('working');
      }
    });
  }
}
