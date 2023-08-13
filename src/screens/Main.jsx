import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import Home from './Home';
import Profile from './Profile/Profile';
import Register from './Auth/Register';
import Login from './Auth/Login';
import EventDetail from './eventDetail/Index';
import ForgotPassword from './Auth/ForgotPassword';
import Booking from './Booking/Index';
import Wishlist from './Wishlist/Index';
import Settings from './Settings/Index';
import EditProfile from './Profile/EditProfile';
import Payment from './Payment/Index';
import MyBooking from './MyBooking/index';
import ChangePassword from './Auth/ChangePassword';
import ManageEvent from './Manage/Index';
import ConfirmPayment from './ConfirmPayment/Index';
import CreateEvent from './Manage/Create';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

import React from 'react';

export default function Main() {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer theme={DefaultTheme}>
      {!token && (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="Register" component={Register} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
        </AuthStack.Navigator>
      )}
      {token && (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Create" component={CreateEvent} />
          <Stack.Screen name="ManageEvent" component={ManageEvent} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="EventDetail" component={EventDetail} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Wishlist" component={Wishlist} />
          <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
          <Stack.Screen name="MyBooking" component={MyBooking} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
