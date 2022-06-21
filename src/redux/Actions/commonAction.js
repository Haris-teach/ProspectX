import {
  GET_ALL_NUMBERS,
  GET_ALL_EMAILS,
  TWILIO_TOKEN,
  TAB_LOCATION,
  GET_NOTINUMBER,
  TWILIO_CALL_SID,
} from './actionType';

export function GetNumbers(numbers) {
  //console.log('YA RESPONSE HA:   ', numbers);
  return {
    type: GET_ALL_NUMBERS,
    payload: numbers,
  };
}

export function GetEmails(email) {
  return {
    type: GET_ALL_EMAILS,
    payload: email,
  };
}

export function GetTwilioToken(accessToken) {
  return {
    type: TWILIO_TOKEN,
    payload: accessToken,
  };
}

export function GetTabLocation(location) {
  return {
    type: TAB_LOCATION,
    payload: location,
  };
}

export function GetNotiNumber(number) {
  return {
    type: GET_NOTINUMBER,
    payload: number,
  };
}

export function GetTwilioCallSid(sid) {
  return {
    type: TWILIO_CALL_SID,
    payload: sid,
  };
}
