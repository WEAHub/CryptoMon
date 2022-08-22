import { createReducer, on, Action } from '@ngrx/store';
import { User, userStatus } from '../models/user.model';
import * as loginActions from './login.actions';

const initialState: User = {
	username: localStorage.getItem('username')!,
	name: localStorage.getItem('name')!,
  token: localStorage.getItem('token')!,
	isLogged: localStorage.getItem('token') !== null,
  status: localStorage.getItem('token') !== null ? userStatus.LOADED : userStatus.UNINITIALIZED,
  error: '',
}

const loginReducer = createReducer(
	initialState,
	on(loginActions.loginStart, (state) => {
		return {
			...state,
			status: userStatus.LOADING,
			error: '',
			isLogged: false
		}
	}),
	on(loginActions.loginSuccess, (state, payload) => {
		return {
			...state,
			name: payload.user.name,
			username: payload.user.username,
			token: payload.user.token,
			status: userStatus.LOADED,
			error: '',
			isLogged: true
		}
	}),
	on(loginActions.loginError, (state, payload) => {
		return {
			...state,	
			username: '',
			token: '',
			error: payload.error.error,
			status: userStatus.UNINITIALIZED,
			isLogged: false,
		}
	}),
	on(loginActions.logout, (state) => {
		return {
			...state,
			username: '',
			token: '',
			error: '',
			status: userStatus.UNINITIALIZED,
			isLogged: false
		}
	})
)

export {
	loginReducer	
}