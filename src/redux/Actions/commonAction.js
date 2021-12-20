import {GET_ALL_NUMBERS} from './actionType';

export function GetNumbers(numbers) {
  //console.log('YA RESPONSE HA:   ', numbers);
  return {
    type: GET_ALL_NUMBERS,
    payload: numbers,
  };
}
