import { combineReducers } from 'redux';
import { changeStateReducer } from './ui.reducer';
import { employerCreation } from './employer.creation.reducer';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

const rootReducer = combineReducers({
  changeState: changeStateReducer,
  loadingBar,
  employerCreation,
});

export default rootReducer;
