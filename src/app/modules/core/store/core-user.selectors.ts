import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IAppStore } from "../models/app.model";

const appState = createFeatureSelector<IAppStore>('app');

const getToggleState = createSelector(
	appState,
	(state: IAppStore) => state.userSideNav.toggleStatus
)

const getUserModify = createSelector(
	appState,
	(state: IAppStore) => state.userSettings
)

export {
	getToggleState,
	getUserModify
}