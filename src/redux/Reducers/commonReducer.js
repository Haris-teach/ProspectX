import {GETALLPHONENUM} from '../Actions/actionType';

const INITIAL_STATE = {
  cellNumbers: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETALLPHONENUM:
      return {
        ...state,
        cellNumbers: action.payload,
      };
      break;

    default:
      return state;
  }
};
