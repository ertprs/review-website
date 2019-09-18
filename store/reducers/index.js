import {combineReducers} from 'redux';
import authReducer from './authReducer';
import trustReducer from './trustReducer';

export default combineReducers({
    auth:authReducer,
    trustVote: trustReducer
})