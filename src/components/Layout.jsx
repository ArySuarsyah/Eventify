import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  DrawerLayoutAndroid,
} from 'react-native';

import globalStyle from '../assets/globalStyles';
import Icon from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import userImage from '../assets/Image/userDefault.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DEFAULT_IMAGE = Image.resolveAssetSource(userImage).uri;

const removeTokenFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
};
const logout = async () => {
  removeTokenFromLocalStorage();
};
const navigationView = () => (
  <View style={[globalStyle.navigationContainer]}>
    <View style={globalStyle.profileNavigation}>
      <View style={globalStyle.drawerUserImage}>
        <Image
          source={{
            uri: USER_DEFAULT_IMAGE,
          }}
          width={70}
          height={70}
        />
      </View>
      <View>
        <Text style={globalStyle.subtitle}>User Name</Text>
        <Text style={globalStyle.subtitle}>User jobdesk</Text>
      </View>
      <Icon name="chevron-right" size={50} />
    </View>
    <View>
      <View style={globalStyle.drawerNavList}>
        <FontAwesome name="user-circle" color="#c0bfbc" size={30} />
        <Text style={globalStyle.drawerNavPoint}>Profile</Text>
      </View>
      <View style={globalStyle.drawerNavList}>
        <Octicons name="checklist" color="#c0bfbc" size={30} />
        <Text style={globalStyle.drawerNavPoint}>My Booking</Text>
      </View>
      <View style={globalStyle.drawerNavList}>
        <FontAwesome name="heart" color="#c0bfbc" size={30} />
        <Text style={globalStyle.drawerNavPoint}>My Wishlist</Text>
      </View>
      <View style={globalStyle.drawerNavList}>
        <Ionicons name="cog" color="#c0bfbc" size={30} />
        <Text style={globalStyle.drawerNavPoint}>Settings</Text>
      </View>
      <TouchableOpacity onPress={logout}>
        <View style={globalStyle.drawerNavList}>
          <MaterialIcons name="logout" color="#f03e3e" size={30} />
          <Text style={[globalStyle.drawerNavPoint, globalStyle.redColor]}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default function Layout({children}) {
  const drawer = React.useRef(null);

  return (
    <SafeAreaView style={styles.saveArea}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={navigationView}>
        {children}
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveArea: {flex: 1, backgroundColor: 'white'},
});
