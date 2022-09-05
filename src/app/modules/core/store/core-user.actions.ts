import { createAction, props } from '@ngrx/store';
import { IUserSettings, IUserSettingsResponseSuccess,IUserSettingsResponseError } from '../models/user-settings.model'

enum ActionTypes {
	TOGGLE_USER_SIDENAV = '[User] Toggling user sidenav',
  MODIFY_USER_REQUEST = '[User] Trying modify user',
  MODIFY_USER_SUCCESS = '[User] Modify user success',
  MODIFY_USER_ERROR = '[User] Modify user error',
}

const toggleUserSidenav = createAction(ActionTypes.TOGGLE_USER_SIDENAV)
const modifyUser = createAction(ActionTypes.MODIFY_USER_REQUEST, props<{data: IUserSettings}>());
const modifyUserSuccess = createAction(ActionTypes.MODIFY_USER_SUCCESS, props<IUserSettingsResponseSuccess>());
const modifyUserError = createAction(ActionTypes.MODIFY_USER_ERROR, props<{error: string}>());

export {
  modifyUser,
  modifyUserSuccess,
  modifyUserError,
	toggleUserSidenav,
}