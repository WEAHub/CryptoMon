interface UserLogin {
  username?: string | null;
  password?: string | null;
}

interface UserSignup {
  name?: string | null;
  username?: string | null;
  password?: string | null;
}

interface User {
  username: string;
  name: string;
  token: string;
  error?: string;
  isLogged: boolean;
  status?: string;
}

enum userStatus {
  UNINITIALIZED = 'uninitialized',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

export {
  User,
  UserLogin,
  UserSignup,
  userStatus
}