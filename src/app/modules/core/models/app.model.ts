interface IAppStore {
	userSideNav: {
		toggleStatus: boolean;
	},
	userSettings: {
		message: string;
		error: boolean;
	}
}


export {
	IAppStore
}