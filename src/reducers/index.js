import { combineReducers } from 'redux';
import { authentication } from './authReducers/auth.reducer';
import { changeStateReducer } from './ui.reducer';

const rootReducer = combineReducers({
  changeState: changeStateReducer,
  authentication,
});

export default rootReducer;
