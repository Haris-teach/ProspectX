import {LOGIN_REQUEST, LOGOUT_REQUEST, GETALLPHONENUM} from './actionType';

export function Login(token, userName, firstName, lastName, id, email) {
  return {
    type: LOGIN_REQUEST,
    payload: {token, userName, firstName, lastName, id, email},
  };
}

export function GetAllPhoneNum(numbers) {
  return {
    type: GETALLPHONENUM,
    payload: numbers,
  };
}

export function logout() {
  return {type: LOGOUT_REQUEST};
}
