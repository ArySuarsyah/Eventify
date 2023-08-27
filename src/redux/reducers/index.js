import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import auth from './authReducers';
import event from './event';
import payment from './paymentReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceToken from './deviceToken';
import profile from './profile';
import routesName from './routesName';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  event,
  deviceToken,
  payment,
  profile,
  routesName,
});

export default reducer;
