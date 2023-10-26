import { combineReducers } from 'redux';
import dogReducer from './dogReducer';

export default combineReducers({
    dogs: dogReducer
});

