interface IAppStore {
	userSideNav: IAppUserSideNav,
	userSettings: IAppUserSettings
	noConnection: boolean;
  userStats: IUserStats;
}

interface IUserStats {
  trades: number;
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
	IAppUserSideNav,
  IUserStats
}