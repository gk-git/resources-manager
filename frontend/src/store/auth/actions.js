// https://github.com/diegohaz/arc/wiki/Actions
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#social
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_PREPARE = "AUTH_LOGIN_PREPARE";
export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const authLoginPrepare = (service, { clientId, ...options } = {}) => ({
  type: AUTH_LOGIN_PREPARE,
  payload: {
    service,
    clientId,
    ...options
  }
});

export const authLoginRequest = (service, { clientId, ...options } = {}) => ({
  type: AUTH_LOGIN_REQUEST,
  payload: {
    service,
    clientId,
    ...options
  },
  meta: {
    // https://github.com/diegohaz/arc/wiki/Example-redux-modules#gtm
    gtm: service
  }
});

export const authLoginSuccess = (user, request) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: user,
  meta: {
    request
  }
});

export const authLoginFailure = (error, request) => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
  meta: {
    request
  }
});

export const authLogout = () => ({ type: AUTH_LOGOUT });
