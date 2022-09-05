import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { createReducer, on } from '@ngrx/store';

import { IAppStore } from '../models/app.model';
import { IUserSettingsResponseSuccess, IUserSettingsResponseError } from '../models/user-settings.model';
import * as userActions from './core-user.actions';

const initialState: IAppStore = <IAppStore>{
	userSideNav: {
		toggleStatus: false
	},
	userSettings: {
		message: '',
		error: false
	}
}

const appReducer = createReducer(
	initialState,
	on(userActions.toggleUserSidenav, (state: IAppStore) => {
		return {
			...state,
			userSideNav: {
				toggleStatus: !state.userSideNav.toggleStatus
			}
		}
	}),
	on(userActions.modifyUser, (state: IAppStore) => {
		return {
			...state,
			userSettings: {
				message: '',
				error: false,
			}
		}
	}),
	on(userActions.modifyUserSuccess, (state: IAppStore, payload: IUserSettingsResponseSuccess) => {
		console.log(payload);
		return {
			...state,
			userSettings: {
				message: payload.message,
				error: false,
			}
		}
	}),
	on(userActions.modifyUserError, (state: IAppStore, payload: IUserSettingsResponseError) => {
		return {
			...state,
			userSettings: {
				message: payload.error,
				error: true,
			}
		}
	})
)

export {
	appReducer
}