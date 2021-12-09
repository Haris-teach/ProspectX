import {LOGIN_REQUEST, LOGOUT_REQUEST} from './actionType';

export function Login(token, name) {
  return {type: LOGIN_REQUEST, payload: {token, name}};
}

export function logout() {
  return {type: LOGOUT_REQUEST};
}
