import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, exhaustMap, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { UserLogin } from '../models/user.model';
import * as loginActions from './login.actions';



@Injectable()

export class AuthEffects {

	login$ = createEffect(() => this.actions$.pipe(
		ofType(loginActions.loginStart),
		exhaustMap((action) => this.authService.login(action.userData).pipe(
			map(user => loginActions.loginSuccess({ user })),
			catchError(error => of(loginActions.loginError({ error: error.error })))
		))
	));

	loginSuccess$ = createEffect(() => this.actions$.pipe(
		ofType(loginActions.loginSuccess),
		tap(payload => {			
      localStorage.setItem('username', payload.user.username);
      localStorage.setItem('name', payload.user.name);
      localStorage.setItem('token', payload.user.token);
			this.router.navigate(['/portfolio'])
		})
	), { dispatch: false });

	logout$ = createEffect(() => this.actions$.pipe(
		ofType(loginActions.logout),
		tap(() => {
			localStorage.removeItem('username');
			localStorage.removeItem('name');
			localStorage.removeItem('token');
			this.router.navigate(['/auth/login'])
		})
	), { dispatch: false });

	constructor(
		private actions$: Actions, 
		private authService: AuthService,
		private router: Router
	) {}
}