import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  intervalSubscription: Subscription;

  constructor() {
    // this.returnObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (value) => console.log('Subs: ', value),
    //     (err) => console.warn('Error:', err),
    //     () => console.log('Obs Completed')
    //   );

    this.intervalSubscription = this.returnInterval().subscribe((value) =>
      console.log(value)
    );
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(500).pipe(
      map((val) => val + 1),
      filter((val) => val % 2 === 0)
      // take(10)
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>((observer) => {
      const myInterval = setInterval(() => {
        observer.next(++i);

        if (i === 4) {
          clearInterval(myInterval);
          observer.complete();
        }

        if (i === 2) {
          // i = 0;
          observer.error('I llego al 2');
        }
      }, 1000);
    });
  }
}
