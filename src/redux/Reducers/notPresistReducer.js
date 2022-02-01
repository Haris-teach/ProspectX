import {TAB_LOCATION} from '../Actions/actionType';

const INITIAL_STATE = {
  location: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAB_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
};
