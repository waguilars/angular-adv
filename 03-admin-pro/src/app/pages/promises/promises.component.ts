import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [],
})
export class PromisesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Salio bien');
    //   } else {
    //     reject('Salio mal');
    //   }
    // });
    // promise
    //   .then((msj) => console.log(msj))
    //   .catch((err) => console.log('Algo salio mal', err));

    this.getUsers().then((users) => console.log(users));
  }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then((res) => res.json())
        .then((body) => {
          resolve(body.data);
        });
    });
  }
}
