import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

import { UserLogin, User } from '../models/user.model';
@Injectable()

export class AuthService {
  constructor(private http: HttpClient) { }

  API_HOST = 'http://localhost:3000'

  login(userData: UserLogin): Observable<any> {
    return this.http.post(`${this.API_HOST}/auth/login`, userData)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      )
  }

  signup(userData: UserLogin): Observable<any> {
    return this.http.post(`${this.API_HOST}/auth/signup`, userData)
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