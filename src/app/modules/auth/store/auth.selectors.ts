import { createSelector, createFeatureSelector } from "@ngrx/store";
import { User, userStatus } from "../models/user.model"; 

const userState = createFeatureSelector<User>('user');

const isUserLoading = createSelector(
	userState,
	(state: User) => state.status === userStatus.LOADING
)

const isAuthed = createSelector(
	userState,
	(state: User) => state.isLogged 
)

const userError = createSelector(
	userState,
	(state: User) => state.error 
)

const getUserState = createSelector(
	userState,
	(state: User) => state
)

export {
	userState,
	isUserLoading,
	isAuthed,
	getUserState,
	userError
}