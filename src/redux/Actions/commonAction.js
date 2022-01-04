import {GET_ALL_NUMBERS, GET_NOTIFICATION} from './actionType';

export function GetNumbers(numbers) {
  //console.log('YA RESPONSE HA:   ', numbers);
  return {
    type: GET_ALL_NUMBERS,
    payload: numbers,
  };
}

export function GetNotification(number) {
  return {
    type: GET_NOTIFICATION,
    payload: number,
  };
}
