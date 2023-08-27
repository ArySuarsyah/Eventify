/* eslint-disable react/no-unstable-nested-components */
import {useSelector} from 'react-redux';
import {View, Image, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  DefaultTheme,
  useFocusEffect,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Profile from './Profile/Profile';
import Register from './Auth/Register';
import Login from './Auth/Login';
import ForgotPassword from './Forgot/ForgotPassword';
import Wishlist from './Wishlist/Index';
import MyBooking from './MyBooking/index';
import ManageEvent from './Manage/Index';
import InputPin from './Forgot/InputPin';
import ResetPassword from './Forgot/ResetPassword';
import {useDispatch} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {logout} from '../redux/reducers/authReducers';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import React from 'react';
import http from '../helper/http';
import {getUserData} from '../redux/reducers/profile';
import globalStyle from '../assets/globalStyles';
import Home from './Home';
import Headers from '../components/Headers';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const defaultimg = require('../assets/Image/userDefault.png');
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.profile.data);

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataProfile = async () => {
        try {
          const {data} = await http(token).get('/profile');
          dispatch(getUserData(data.results));
        } catch (error) {
          const message = error?.response?.data?.message;
          if (message) {
            console.log(message);
          }
        }
      };
      fetchDataProfile();
    }, [token, dispatch]),
  );

  return (
    <DrawerContentScrollView {...props}>
      <View style={globalStyle.containerProfileDrawwer}>
        <View style={globalStyle.fotoDrawwer}>
          <View style={globalStyle.fotoIcon}>
            {user?.picture === null && (
              <FontAwesome5Icon name="users" color="#61677A" size={20} />
            )}
            {user?.picture && (
              <Image
                source={{
                  uri: user?.picture
                    ? `https://res.cloudinary.com/arsrsyh/image/upload/v1692086351/${user.picture}`
                    : defaultimg,
                }}
                width={70}
                height={70}
              />
            )}
          </View>
        </View>
        <View>
          <Text style={globalStyle.textFullname}>
            {user?.fullName?.length < 12 && user?.fullName}
            {user?.fullName?.length >= 12 &&
              user?.fullName?.slice(0, 12) + ' ...'}
          </Text>
          <Text style={globalStyle.textProfession}>
            {user.profession ? user.profession : 'profession: -'}
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelColor="red"
        onPress={() => dispatch(logout())}
        icon={({focused, color, size}) => (
          <FeatherIcon name="log-out" color="red" size={30} />
        )}
      />
    </DrawerContentScrollView>
  );
}

function DrawerComponent() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: Headers,
        // drawerStyle: {
        //   backgroundColor: '#eaeaea',
        //   width: 240,
        // },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome5Icon name="home" color={color} size={30} />
          ),
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome name="user-circle" color={color} size={30} />
          ),
          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen
        name="History"
        component={MyBooking}
        options={{
          drawerIcon: ({color, size}) => (
            <Octicons name="checklist" color={color} size={30} />
          ),
          drawerLabel: 'History',
        }}
      />
      <Drawer.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome name="heart" color={color} size={30} />
          ),
          drawerLabel: 'Wishlist',
        }}
      />
      <Drawer.Screen
        name="Manage Event"
        component={ManageEvent}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="cog" color={color} size={30} />
          ),
          drawerLabel: 'Manage Event',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Main() {
  const token = useSelector(state => state.auth.token);

  return (
    <NavigationContainer theme={DefaultTheme}>
      {!token && (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="Register" component={Register} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          <AuthStack.Screen name="InputPin" component={InputPin} />
        </AuthStack.Navigator>
      )}
      {token && <DrawerComponent />}
    </NavigationContainer>
  );
}
