import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Intercept');

    const headers = new HttpHeaders({
      'x-token': '12346',
    });

    const req = request.clone({
      headers,
    });

    return next.handle(req).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.warn(error);
    console.log('error en el servicio');
    return throwError('Error personalizado');
  }
}
