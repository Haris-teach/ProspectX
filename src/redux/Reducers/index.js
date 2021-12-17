import {combineReducers} from 'redux';
import authReducer from './authReducer';
import commonReducer from './commonReducer';

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
});

export default rootReducer;
