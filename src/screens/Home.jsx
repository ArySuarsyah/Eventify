/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  DrawerLayoutAndroid,
} from 'react-native';
import {Searchbar, TouchableRipple} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import globalStyle from '../assets/globalStyles';
import ImageEvent from '../assets/Image/advanture.jpg';
import userImage from '../assets/Image/userDefault.png';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../helper/http';
import jwt_decode from 'jwt-decode';
import EventList from '../components/Home/EventList';
import {logout as logoutAction} from '../redux/reducers/authReducers';

export default function Home() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [searchEvent, setSearchEvent] = React.useState('');
  const [user, setUser] = React.useState([]);
  const [eventList, setEventList] = React.useState([]);
  const drawer = React.useRef(null);
  const {id} = jwt_decode(token);
  const USER_DEFAULT_IMAGE = Image.resolveAssetSource(userImage).uri;
  const navigation = useNavigation();
  const deviceToken = useSelector(state => state.deviceToken.deviceToken);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      dispatch(logoutAction());
    } catch (e) {
      console.log(e);
    }

    console.log('Done.');
  };

  const onChangeSearch = query => setSearchEvent(query);

  const getUser = React.useCallback(async () => {
    const {data} = await http(token).get('/profile');
    console.log(data.results);
    setUser(data.results);
  }, [token]);

  const getEvent = React.useCallback(
    async (page = 1, search = '') => {
      const {data} = await http(token).get('/events', {
        params: {
          page,
          search,
        },
      });
      setEventList(data.results);
    },
    [token],
  );

  const saveToken = React.useCallback(async () => {
    const form = new URLSearchParams({token: deviceToken.token});
    await http(token).post('/device-token', form.toString());
  }, [deviceToken, token]);

  React.useEffect(() => {
    getEvent();
    getUser();
    saveToken();
  }, [getEvent, getUser, saveToken]);

  React.useEffect(() => {
    getEvent(1, searchEvent);
  }, [searchEvent, getEvent]);

  const navigationView = () => (
    <View style={[globalStyle.navigationContainer]}>
      <View style={globalStyle.profileNavigation}>
        <View style={globalStyle.drawerUserImage}>
          {!user?.picture && (
            <Image
              source={{
                uri: USER_DEFAULT_IMAGE,
              }}
              width={70}
              height={70}
            />
          )}
          {user.picture && (
            <Image
              source={{
                uri: `http://localhost:8888/uploads/${user.picture}`,
              }}
              width={70}
              height={70}
            />
          )}
        </View>
        <View>
          <Text style={globalStyle.subtitle}>{user.fullName}</Text>
          <Text style={globalStyle.subtitle}>{user.email}</Text>
        </View>
        <Icon name="chevron-right" size={50} />
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={globalStyle.drawerNavList}>
            <FontAwesome name="user-circle" color="#c0bfbc" size={30} />
            <Text style={globalStyle.drawerNavPoint}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
          <View style={globalStyle.drawerNavList}>
            <Octicons name="checklist" color="#c0bfbc" size={30} />
            <Text style={globalStyle.drawerNavPoint}>My Booking</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
          <View style={globalStyle.drawerNavList}>
            <FontAwesome name="heart" color="#c0bfbc" size={30} />
            <Text style={globalStyle.drawerNavPoint}>My Wishlist</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <View style={globalStyle.drawerNavList}>
            <Ionicons name="cog" color="#c0bfbc" size={30} />
            <Text style={globalStyle.drawerNavPoint}>Settings</Text>
          </View>
        </TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.saveArea}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={navigationView}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.gap}>
              <View style={styles.navbar}>
                <Icon
                  name="menu"
                  size={30}
                  color="#02A8A8"
                  onPress={() => drawer.current.openDrawer()}
                />
                <Icon name="message-square" size={30} color="#02A8A8" />
              </View>
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchEvent}
              />
            </View>
            <View style={styles.dateParent}>
              <View style={styles.dateStyle}>
                <Text style={styles.colorDate}>15</Text>
                <Text style={styles.colorDate}>Wed</Text>
              </View>
              <View style={styles.dateStyle}>
                <Text style={styles.colorDate}>15</Text>
                <Text style={styles.colorDate}>Wed</Text>
              </View>
              <View style={styles.dateStyle}>
                <Text style={styles.colorDate}>15</Text>
                <Text style={styles.colorDate}>Wed</Text>
              </View>
              <View style={styles.dateStyle}>
                <Text style={styles.colorDate}>15</Text>
                <Text style={styles.colorDate}>Wed</Text>
              </View>
              <View style={styles.dateStyle}>
                <Text style={styles.colorDate}>15</Text>
                <Text style={styles.colorDate}>Wed</Text>
              </View>
            </View>
            <View style={styles.bgColor}>
              <View style={styles.eventListContainer}>
                <View style={styles.eventHeader}>
                  <Text style={{fontSize: 20}}>Events For You</Text>
                  <FontAwesome name="sliders" size={25} color="#02A8A8" />
                </View>
                <View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.eventList}>
                      {eventList.map(event => (
                        <EventList
                          key={`event-${event.id}`}
                          title={event?.title}
                          date={event?.createdAt}
                          id={event?.id}
                          image={`https://res.cloudinary.com/arsrsyh/image/upload/v1690531959/${event.picture}`}
                          event={event}
                          styles={styles}
                        />
                      ))}
                    </View>
                  </ScrollView>
                </View>
                <View>
                  <Text style={{fontSize: 20}}>Discover</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row', gap: 50, padding: 10}}>
                      <TouchableRipple>
                        <View style={[styles.listNavEvent, styles.shadowProp]}>
                          <View
                            style={{
                              padding: 7,
                              backgroundColor: '#dedede',
                              borderRadius: 50,
                              width: 40,
                              height: 40,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <MaterialCommunityIcons
                              name="map-marker-outline"
                              size={20}
                              color="#02A8A8"
                            />
                          </View>
                          <Text style={{fontSize: 12}}>YOUR AREA</Text>
                        </View>
                      </TouchableRipple>
                      <View style={[styles.listNavEvent, styles.shadowProp]}>
                        <View
                          style={{
                            padding: 7,
                            backgroundColor: '#dedede',
                            borderRadius: 50,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <FontAwesome name="music" size={20} color="#02A8A8" />
                        </View>
                        <Text style={{fontSize: 12}}>MUSIC</Text>
                      </View>
                      <View style={[styles.listNavEvent, styles.shadowProp]}>
                        <View
                          style={{
                            padding: 7,
                            backgroundColor: '#dedede',
                            borderRadius: 50,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <FontAwesome name="music" size={20} color="#02A8A8" />
                        </View>
                        <Text style={{fontSize: 12}}>MUSIC</Text>
                      </View>
                    </View>
                  </ScrollView>
                </View>
                <View>
                  {eventList.map(event => (
                    <EventList
                      key={`event-${event.id}`}
                      title={event?.title}
                      date={event?.createdAt}
                      id={event?.id}
                      image={`https://res.cloudinary.com/arsrsyh/image/upload/v1690531959/${event.picture}`}
                      event={event}
                      styles={styles}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchStyle: {
    backgroundColor: '#eceff4',
    borderColor: '#02A8A8',
  },
  searchInput: {width: '70%'},
  navbar: {flexDirection: 'row', justifyContent: 'space-between'},
  gap: {gap: 10, paddingHorizontal: 20},
  container: {paddingTop: 20, backgroundColor: '#018383', position: 'relative'},
  dateStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    height: 70,
    borderColor: '#F5DEA3',
    borderWidth: 1,
    borderRadius: 20,
  },
  dateParent: {
    marginTop: 70,
    paddingTop: 50,
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#393646',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 160,
  },
  colorDate: {color: '#F5DEA3'},
  imgParent: {
    borderRadius: 20,
    width: 200,
    height: 300,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 0,
  },
  eventList: {flexDirection: 'row', gap: 10, width: '100%', flex: 1},
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  arrowIcon: {
    backgroundColor: '#F5DEA3',
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDesc: {position: 'absolute', bottom: 20, left: 20, gap: 10},
  eventTime: {fontSize: 15, color: '#fff'},
  eventTitle: {fontSize: 18, maxWidth: 150, color: '#fff', flexShrink: 1},
  relative: {position: 'relative'},
  eventListContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: '100%',
    zIndex: 2,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 30,
  },
  saveArea: {flex: 1, backgroundColor: '#018383'},
  dateSelected: {
    backgroundColor: '#F5DEA3',
    width: 20,
    height: 20,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 3,
    top: -10,
  },
  bgColor: {
    backgroundColor: '#393646',
  },
  listNavEvent: {
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 150,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 22,
    elevation: 5,
  },
});
