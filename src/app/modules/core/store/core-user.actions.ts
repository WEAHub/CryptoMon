import { createAction, props } from '@ngrx/store';
import { IUserSettings, IUserSettingsResponseSuccess, IDeleteUser } from '../models/user-settings.model'

enum ActionTypes {
	TOGGLE_USER_SIDENAV = '[User] Toggling user sidenav',
  MODIFY_USER_REQUEST = '[User] Trying modify user',
  MODIFY_USER_SUCCESS = '[User] Modify user success',
  MODIFY_USER_ERROR = '[User] Modify user error',
  DELETE_USER_REQUEST = '[User] Trying delete user',
  DELETE_USER_SUCCESS = '[User] Delete user success',
  DELETE_USER_ERROR = '[User] Delete user error',
  USER_RESET = '[User] Reset user',
  NO_CONNECTION = '[User] No connection'
}

const toggleUserSidenav = createAction(ActionTypes.TOGGLE_USER_SIDENAV)
const modifyUser = createAction(ActionTypes.MODIFY_USER_REQUEST, props<{data: IUserSettings}>());
const modifyUserSuccess = createAction(ActionTypes.MODIFY_USER_SUCCESS, props<IUserSettingsResponseSuccess>());
const modifyUserError = createAction(ActionTypes.MODIFY_USER_ERROR, props<{error: string}>());

const deleteUser = createAction(ActionTypes.DELETE_USER_REQUEST, props<{data: IDeleteUser}>());
const deleteUserSuccess = createAction(ActionTypes.DELETE_USER_SUCCESS, props<IUserSettingsResponseSuccess>());
const deleteUserError = createAction(ActionTypes.DELETE_USER_ERROR, props<{error: string}>());

const resetStateUser = createAction(ActionTypes.USER_RESET);

const noConnection = createAction(
  ActionTypes.NO_CONNECTION,
)

export {
	deleteUser,
	deleteUserSuccess,
	deleteUserError,
  modifyUser,
  modifyUserSuccess,
  modifyUserError,
	toggleUserSidenav,
  resetStateUser,
  noConnection
}