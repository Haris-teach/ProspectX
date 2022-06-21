import {EXTERNAL_ID, LOGIN_REQUEST, LOGOUT_REQUEST} from './actionType';

export function Login(token, userName, firstName, lastName, id, email) {
  return {
    type: LOGIN_REQUEST,
    payload: {token, userName, firstName, lastName, id, email},
  };
}

export function logout() {
  return {type: LOGOUT_REQUEST};
}

export function ExternalId(exId) {
  return {type: EXTERNAL_ID, payload: exId};
}
