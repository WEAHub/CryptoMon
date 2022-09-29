import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IHTTPErrorResponse } from '../models/http.model';

@Injectable()

export class RequestService {
  constructor(
    private http: HttpClient,
  ) { }

  httpGet(url: string): Observable<any> {
    return this.http.get(url)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    )
  }

  httpPost(url: string, postData: object): Observable<any> {
    return this.http.post(url, postData)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse): Observable<IHTTPErrorResponse>  {

    const errorResponse: IHTTPErrorResponse = {
      error: err.error.message
    }

    return throwError(() => {
      new Error(errorResponse.error)
      return errorResponse
    });

  }
}