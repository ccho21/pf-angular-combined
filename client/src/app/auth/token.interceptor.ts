import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // set Header
    this.setHeaders(req); 

    // Skip intercceptor when not needed.
    const skipIntercept = req.headers.has('skip');
    if (skipIntercept) {
      console.log(skipIntercept);
      // remove the skip header
      const cloned = req.clone({
        headers: req.headers.delete('skip'),
      });
      return next.handle(cloned);
    }

    // checks if the token is valid
    // if valid, it sets the token to the header.
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('x-auth-token', token),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

  private setHeaders(req: HttpRequest<any>) {
    // add content-type when POST method
    if (req.method === 'POST') {
      req.clone({
        headers: req.headers.set('content-type', 'application/json'),
      });
    }
  }
}
