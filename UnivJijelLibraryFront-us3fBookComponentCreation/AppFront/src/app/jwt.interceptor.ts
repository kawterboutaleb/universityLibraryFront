import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/api/v1/auth/authenticate')) {
      // Skip intercepting the login request
      return next.handle(request);
    }
    const jwtToken = sessionStorage.getItem('jwtToken');
    console.log('JwtInterceptor is intercepting the request.'+ jwtToken);
    // If the token exists, add it to the request headers
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
        
      });
    }

    return next.handle(request);
  }
   /* const jwtToken = this.tokenService.getToken();
    console.log('JwtInterceptor is intercepting the request.' + jwtToken);

    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
    }

    return next.handle(request);
  }*/
}



/*import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    // Get the JWT token from local storage
    const jwtToken = sessionStorage.getItem('jwtToken');
    console.log('JwtInterceptor is intercepting the request.'+ jwtToken);
    // If the token exists, add it to the request headers
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
        
      });
    }

    return next.handle(request);
  }
}
*/