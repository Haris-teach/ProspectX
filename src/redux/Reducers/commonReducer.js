import {GET_ALL_NUMBERS, GET_NOTIFICATION} from '../Actions/actionType';

const INITIAL_STATE = {
  Numbers: 'Hello',
  NotiNumber: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_NUMBERS:
      return {
        ...state,
        Numbers: action.payload,
      };
    case GET_NOTIFICATION:
      return {
        ...state,
        NotiNumber: action.payload,
      };
    default:
      return state;
  }
};
