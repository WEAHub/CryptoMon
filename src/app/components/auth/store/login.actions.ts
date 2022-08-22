import { createAction, props } from '@ngrx/store';
import { UserLogin, User } from '../models/user.model';

enum ActionTypes {
  LOGIN_REQUEST = '[Auth] Trying Login',
  LOGIN_REQUEST_SUCCESS = '[Auth] Login Success',
  LOGIN_REQUEST_ERROR = '[Auth] Login Error',
  LOGOUT = '[Auth] Logout',
  SIGNUP = '[Auth] Signup',
}

const loginStart = createAction(ActionTypes.LOGIN_REQUEST, props<{ userData: UserLogin }>());
const loginSuccess = createAction(ActionTypes.LOGIN_REQUEST_SUCCESS, props<{ user: User }>());
const loginError = createAction(ActionTypes.LOGIN_REQUEST_ERROR, props<{ error : { error: string }}>());
const logout = createAction(ActionTypes.LOGOUT);

export {
  loginStart,
  loginSuccess,
  loginError,
  logout
}