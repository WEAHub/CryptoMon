import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of, tap } from 'rxjs';

import * as userActions from './core-user.actions'
import { UserService } from '../services/core-user.service';
import { IUserSettingsResponseSuccess } from '../models/user-settings.model';
import { changedUserName } from '../../auth/store/auth.actions';

@Injectable()
export class UserEffects {

	modifyUser$ = createEffect(() => this.actions$.pipe(
		ofType(userActions.modifyUser),
		exhaustMap((action) => this.userService.modifyUser(action.data).pipe(
			switchMap((message: IUserSettingsResponseSuccess) => of(
				userActions.modifyUserSuccess(message),
				changedUserName({name: message.name})
			)),
			catchError((message) => of(userActions.modifyUserError({error: message})))
		))
	));
	
	deleteUser$ = createEffect(() => this.actions$.pipe(
		ofType(userActions.deleteUser),
		exhaustMap(action => this.userService.deleteUser(action.data).pipe(
			map(message => userActions.deleteUserSuccess(message)),
			catchError(message => of(userActions.deleteUserError({ error: message })))
		))
	))

	constructor(
		private userService: UserService,
		private actions$: Actions
	) {}

}