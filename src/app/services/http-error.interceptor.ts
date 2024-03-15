import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
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
