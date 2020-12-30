import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userSv: UserService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userSv.validateToken().pipe(
      tap((isAuthorized) => {
        if (!isAuthorized) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userSv.validateToken().pipe(
      tap((isAuthorized) => {
        if (!isAuthorized) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
