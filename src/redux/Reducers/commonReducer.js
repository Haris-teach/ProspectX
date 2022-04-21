import {
  GET_ALL_EMAILS,
  GET_ALL_NUMBERS,
  GET_NOTINUMBER,
  TWILIO_TOKEN,
} from '../Actions/actionType';

const INITIAL_STATE = {
  Numbers: [
    {
      id: 0,
      label: 'All',
      value: 'All',
    },
  ],
  notiNumber: 0,
  emails: 'Empty',
  twilioToken: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_NUMBERS:
      return {
        ...state,
        Numbers: action.payload,
      };

    case GET_ALL_EMAILS:
      return {
        ...state,
        emails: action.payload,
      };

    case TWILIO_TOKEN:
      return {
        ...state,
        twilioToken: action.payload,
      };
    case GET_NOTINUMBER: {
      return {
        ...state,
        notiNumber: action.payload,
      };
    }

    default:
      return state;
  }
};
