enum EStatus {
  UNINITIALIZED = 'uninitialized',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

interface IStatus {
	status: EStatus;
}

export {
	EStatus,
	IStatus
}