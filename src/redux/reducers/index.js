import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import auth from './authReducers';
import event from './event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceToken from './deviceToken';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  event,
  deviceToken,
});

export default reducer;
