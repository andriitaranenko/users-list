import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case HttpStatusCode.Forbidden:
              this.router.navigate([
                '**',
                {
                  error: {
                    code: HttpStatusCode.Forbidden,
                    message: 'Forbidden',
                  },
                },
              ]);
              break;
            case HttpStatusCode.NotFound:
              this.router.navigate([
                '**',
                {
                  error: { code: HttpStatusCode.NotFound, message: 'NotFound' },
                },
              ]);
              break;
          }
        }
        throw error;
      })
    );
  }
}

export const httpErrorInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
