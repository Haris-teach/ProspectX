import {GET_ALL_NUMBERS} from '../Actions/actionType';

const INITIAL_STATE = {
  Numbers: 'Hello',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_NUMBERS:
      return {
        ...state,
        Numbers: action.payload,
      };
    default:
      return state;
  }
};
