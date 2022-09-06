interface IUserSettings {
	username: string;
	name: string;
	newPassword: string;
	currentPassword: string;
}

interface IUserSettingsResponseSuccess {
	name: string;
	message: string;
}

interface IUserSettingsResponseError {
	error: string;
}

interface IDeleteUser {
	username: string;
	password: string;
}

export {
	IUserSettingsResponseError,
	IUserSettingsResponseSuccess,
	IUserSettings,
	IDeleteUser
}