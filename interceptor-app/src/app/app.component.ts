import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'interceptor-app';

  constructor(private userSv: UsersService) {
    this.userSv.getUsers().subscribe(
      (users) => {
        console.log(users);
      },
      (err) => {
        console.log('error en el component');
      }
    );
  }
}
