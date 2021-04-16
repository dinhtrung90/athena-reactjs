import { combineReducers } from 'redux';
import { changeStateReducer } from './ui.reducer';

const rootReducer = combineReducers({
    changeState: changeStateReducer
});

export default rootReducer;
