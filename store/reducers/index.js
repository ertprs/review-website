import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authReducer';
import trustReducer from './trustReducer';

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['logInTemp', 'signUpTemp']
}

export default combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    trustVote: trustReducer
})