import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

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

	private handleError(err: HttpErrorResponse) {
		return throwError(() => new Error(
			err.status === 0
			? 'Connection with the server failed'
			: err.error.message
		));
	}
}