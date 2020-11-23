import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, Data } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  title: string;
  section: string;
  title$: Subscription;

  constructor(private router: Router) {
    this.title$ = this.getRouteData().subscribe(({ title, section }) => {
      this.title = title;
      this.section = section;
      document.title = `AdminPro -  ${title}`;
    });
  }
  ngOnDestroy(): void {
    this.title$.unsubscribe();
  }

  getRouteData(): Observable<Data> {
    return this.router.events.pipe(
      filter((evt) => evt instanceof ActivationEnd),
      filter((evt: ActivationEnd) => evt.snapshot.firstChild === null),
      map((evt: ActivationEnd) => evt.snapshot.data)
    );
  }

  ngOnInit(): void {}
}
