import {
  GET_ALL_EMAILS,
  GET_ALL_NUMBERS,
  GET_NOTINUMBER,
  TWILIO_CALL_SID,
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
  twilioCallJSON: {
    twi_account_sid: '',
    twi_answer_timeout: '',
    twi_bridge_token: '',
    twi_call_sid: '',
    twi_from: '',
    twi_message_id: '',
    twi_message_type: '',
    twi_stir_status: '',
    twi_to: '',
  },
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
    case TWILIO_CALL_SID:
      return {
        ...state,
        twilioCallJSON: action.payload,
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
