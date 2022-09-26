interface IAppStore {
	userSideNav: IAppUserSideNav,
	userSettings: IAppUserSettings
	noConnection: boolean;
}

interface IAppUserSideNav {
	toggleStatus: boolean;
}

interface IAppUserSettings {
	message: string;
	error: boolean;
	deleted: boolean;
}

export {
	IAppStore,
	IAppUserSettings,
	IAppUserSideNav
}