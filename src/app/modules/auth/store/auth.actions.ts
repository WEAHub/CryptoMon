import { createAction, props } from '@ngrx/store';
import { UserLogin, User, UserSignup } from '../models/user.model';

enum ActionTypes {
  LOGIN_REQUEST = '[Auth] Trying Login',
  LOGIN_REQUEST_SUCCESS = '[Auth] Login Success',
  LOGIN_REQUEST_ERROR = '[Auth] Login Error',
  LOGOUT = '[Auth] Logout',
  SIGNUP_REQUEST = '[Auth] Trying Signup',
}

const loginStart = createAction(ActionTypes.LOGIN_REQUEST, props<{ userData: UserLogin }>());
const loginSuccess = createAction(ActionTypes.LOGIN_REQUEST_SUCCESS, props<{ user: User }>());
const loginError = createAction(ActionTypes.LOGIN_REQUEST_ERROR, props<{ error : { message: string }}>());
const logout = createAction(ActionTypes.LOGOUT);

const signupStart = createAction(ActionTypes.SIGNUP_REQUEST, props<{userData: UserSignup}>());

export {
  loginStart,
  loginSuccess,
  loginError,
  logout,
  signupStart,
}