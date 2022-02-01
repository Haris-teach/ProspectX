import {combineReducers} from 'redux';
import authReducer from './authReducer';
import commonReducer from './commonReducer';
import notPresistReducer from './notPresistReducer';

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  notPresistReducer,
});

export default rootReducer;
