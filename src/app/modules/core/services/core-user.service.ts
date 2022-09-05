import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

import { IUserSettings } from '../models/user-settings.model'
import { ConfigService } from 'src/app/services/config.service';
@Injectable()

export class UserService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  modifyUser(userData: IUserSettings): Observable<any> {
    return this.http.post(this.configService.modifyUser, userData)
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      )
  }
	
  private handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(
      err.status === 0
      ? { message: 'Connection with the server failed' }
      : err.error.message
    ));
  }
}