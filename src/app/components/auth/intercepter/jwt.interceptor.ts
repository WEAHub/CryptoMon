import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../store/login.actions';
import { User } from '../models/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
 
	constructor(
    private router: Router,
		private store: Store<{ user: User }>
  ) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('token')!;
    let request = req;
		
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
	
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 403) {
					this.store.dispatch(logout())
        }

        return throwError( err );

      })
    );
  }

}