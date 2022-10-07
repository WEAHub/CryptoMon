import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ConfigService } from '@shared/services/config/config.service';

import * as loginActions from './auth.actions';
import { resetStateMarket } from '../../market/store/market.actions';
import { resetStateNews } from '../../news/store/news.actions';
import { resetStateUser } from '../../core/store/core-user.actions';
import { resetStateTradesModal } from '../../trades/store/trades.actions';


@Injectable()

export class AuthEffects {

	login$ = createEffect(() => this.actions$.pipe(
		ofType(loginActions.loginStart),
		exhaustMap((action) => this.authService.login(action.userData).pipe(
			map(user => loginActions.loginSuccess({ user })),
			catchError(payload => of(loginActions.loginError({ error: payload })))
		))
	));

	loginSuccess$ = createEffect(() => this.actions$.pipe(
		ofType(loginActions.loginSuccess),
		tap(payload => {			
      localStorage.setItem('username', payload.user.username);
      localStorage.setItem('name', payload.user.name);
      localStorage.setItem('token', payload.user.token);
			this.router.navigate(['/news'])
		})
	), { dispatch: false });

	logout$ = createEffect(() => this.actions$.pipe(
		ofType(loginActions.logout),
		switchMap(() => of(
			resetStateUser(),
			resetStateMarket(),
			resetStateNews(),
			resetStateTradesModal(),
		)),
		tap(() => {
			localStorage.removeItem('username');
			localStorage.removeItem('name');
			localStorage.removeItem('token');
			this.router.navigate([this.configService.appConfig.API_ROUTES.AUTH.LOGIN])
		})
	));

	
	signup$ = createEffect(() => this.actions$.pipe(
		ofType(loginActions.signupStart),
		exhaustMap((action) => this.authService.signup(action.userData).pipe(
			map(user => loginActions.loginSuccess({ user })),
			catchError(payload => of(loginActions.loginError({ error: payload })))
		))
	));

	changedName$ = createEffect(() => this.actions$.pipe(
		ofType(loginActions.changedUserName),
		tap(action => {
			localStorage.setItem('name', action.name)
		})
	), { dispatch: false })

	constructor(
		private actions$: Actions, 
		private authService: AuthService,
		private router: Router,
		private configService: ConfigService
	) {}
}