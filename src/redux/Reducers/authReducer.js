import {MaskedViewBase} from 'react-native';
import {LOGIN_REQUEST, LOGOUT_REQUEST} from '../Actions/actionType';

const INITIAL_STATE = {
  id: 1,
  userName: 'M.Haris',
  firstName: 'Muhammad',
  lastName: 'Haris',
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
        userName: action.payload.userName,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        id: action.payload.id,
        email: action.payload.email,
      };
      break;
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLogin: false,
        token: null,
        userName: 'M.Haris',
        firstName: 'Muhammad',
        lastName: 'Haris',
        id: 1,
        email: 'muhammadharis4999@gmail.com',
      };
      break;

    default:
      return state;
  }
};
