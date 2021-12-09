import {LOGIN_REQUEST, LOGOUT_REQUEST} from '../Actions/actionType';

const INITIAL_STATE = {
  id: '',
  user_name: 'M.Haris',
  email: 'muhammadharis4999@gmail.com',
  password: '123456',
  token: null,
  loading: false,
  isLogin: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        user_name: action.payload.name,
      };
      break;
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLogin: false,
      };
      break;

    default:
      return state;
  }
};
