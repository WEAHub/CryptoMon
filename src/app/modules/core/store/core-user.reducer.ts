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
		error: false,
		deleted: false,
	},
	noConnection: false
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
				...state.userSettings,
				message: '',
				error: false,
			}
		}
	}),
	on(userActions.modifyUserSuccess, (state: IAppStore, payload: IUserSettingsResponseSuccess) => {
		return {
			...state,
			userSettings: {
				...state.userSettings,
				message: payload.message,
				error: false,
			}
		}
	}),
	on(userActions.modifyUserError, (state: IAppStore, payload: IUserSettingsResponseError) => {
		return {
			...state,
			userSettings: {
				...state.userSettings,
				message: payload.error,
				error: true,
			}
		}
	}),
	on(userActions.deleteUser, (state: IAppStore) => {
		return {
			...state,
			userSettings: {
				...state.userSettings,
				message: '',
				error: false,
			}
		}
	}),
	on(userActions.deleteUserSuccess, (state: IAppStore, payload: IUserSettingsResponseSuccess) => {
		return {
			...state,
			userSettings: {
				deleted: true,
				message: payload.message,
				error: false,
			}
		}
	}),
	on(userActions.deleteUserError, (state: IAppStore, payload: IUserSettingsResponseError) => {
		return {
			...state,
			userSettings: {
				deleted: false,
				message: payload.error,
				error: true,
			}
		}
	}),
	on(userActions.resetStateUser, () => {
		return Object.assign({}, initialState)
	}),
	on(userActions.noConnection, (state) => {
		return {
			...state,
			noConnection: true
		}
	})
)

export {
	appReducer
}