import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

import { UserLogin } from '../models/user.model';
import { ConfigService } from '@shared/services/config/config.service';

@Injectable()

export class AuthService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  login(userData: UserLogin): Observable<any> {
    return this.http.post(this.configService.login, userData)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      )
  }

  signup(userData: UserLogin): Observable<any> {
    return this.http.post(this.configService.signup, userData)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      )
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(
      err.status === 0
      ? 'Connection with the server failed'
      : err.error.message
    ));
  }
  
}