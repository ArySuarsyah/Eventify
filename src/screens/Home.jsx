/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Searchbar,
  TouchableRipple,
  Modal,
  Portal,
  Button,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import globalStyle from '../assets/globalStyles';
import {useSelector} from 'react-redux';
import http from '../helper/http';
import moment from 'moment';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import LinearGradient from 'react-native-linear-gradient';
import {getId} from '../redux/reducers/event';
import {getUserData} from '../redux/reducers/profile';
import Icon from 'react-native-vector-icons/dist/Feather';
import {Tooltip} from 'react-native-paper';

const Home = () => {
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();
  const [searchEvent, setSearchEvent] = React.useState('');
  const [eventList, setEventList] = React.useState([]);
  const navigation = useNavigation();
  const deviceToken = useSelector(state => state.deviceToken.deviceToken);
  const [category, setCategory] = React.useState([]);
  const [getByCategory, setGetByCategory] = React.useState([]);
  const [sortEvent, setSortEvent] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onChangeSearch = query => setSearchEvent(query);

  const getUser = React.useCallback(async () => {
    const {data} = await http(token).get('/profile');
    dispatch(getUserData(data.results));
  }, [token, dispatch]);

  const getEvent = React.useCallback(
    async (page = 1, searchByName = '', sort = '') => {
      const {data} = await http(token).get('/events', {
        params: {
          page,
          searchByName,
          sort,
        },
      });
      setEventList(data.results);
    },
    [token],
  );

  const getCategory = React.useCallback(
    async (page = 1, limit = 5) => {
      const {data} = await http(token).get('/categories', {
        params: {
          page,
          limit,
        },
      });
      setCategory(data.results);
    },
    [token],
  );

  const getEventByCategory = React.useCallback(
    async (page = 1, limit = 10, searchByCategories = '') => {
      const {data} = await http(token).get('/events', {
        params: {
          page,
          limit,
          searchByCategories,
        },
      });
      setGetByCategory(data.results);
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
    getCategory(1, 10, '');
  }, [getEvent, getUser, saveToken, getCategory]);

  React.useEffect(() => {
    getEvent(1, searchEvent, sortEvent);
    getEventByCategory(1, 10, '');
  }, [searchEvent, sortEvent, getEvent, getEventByCategory]);

  const goToDetail = val => {
    dispatch(getId(val));
    navigation.navigate('Event Detail');
  };

  return (
    <SafeAreaView style={styles.saveArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.gap}>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchEvent}
            />
          </View>
          <View style={styles.dateParent}>
            {eventList.map((item, index) => {
              return (
                <View
                  key={item.id}
                  style={
                    index === 2 ? styles.dateStyleChoose : styles.dateStyle
                  }>
                  <Text style={styles.colorDate}>
                    {moment(item.date).format('DD')}
                  </Text>
                  <Text style={styles.colorDate}>
                    {moment(item.date).format('ddd')}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.bgColor}>
            <View style={styles.eventListContainer}>
              <View style={styles.eventHeader}>
                <Text style={{fontSize: 20}}>Events For You</Text>
                <TouchableRipple onPress={showModal}>
                  <FontAwesome name="sliders" size={25} color="#02A8A8" />
                </TouchableRipple>
                <Portal>
                  <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modalContainerStyle}
                    style={{
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Text style={styles.sortText}>Sort By:</Text>
                    <View>
                      <TouchableRipple onPress={() => setSortEvent('title')}>
                        <Text style={styles.sortText}>Title</Text>
                      </TouchableRipple>
                      <TouchableRipple onPress={() => setSortEvent('date')}>
                        <Text style={styles.sortText}>Date</Text>
                      </TouchableRipple>
                      <TouchableRipple onPress={() => setSortEvent('location')}>
                        <Text style={styles.sortText}>Location</Text>
                      </TouchableRipple>
                      <TouchableRipple onPress={() => setSortEvent('category')}>
                        <Text style={styles.sortText}>Category</Text>
                      </TouchableRipple>
                      <Button
                        onPress={hideModal}
                        style={{
                          width: '25%',
                          alignSelf: 'center',
                          marginVertical: 10,
                          backgroundColor: '#02A8A8',
                        }}>
                        <Text style={{color: 'white'}}>
                          {sortEvent ? 'Ok' : 'Cancel'}
                        </Text>
                      </Button>
                    </View>
                  </Modal>
                </Portal>
              </View>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.eventList}>
                    {eventList.map(event => (
                      // <EventStack
                      //   key={`event-${event.id}`}
                      //   title={event?.title}
                      //   date={event?.date}
                      //   id={event?.id}
                      //   image={`https://res.cloudinary.com/arsrsyh/image/upload/v1690531959/${event.picture}`}
                      //   event={event}
                      //   styles={styles}
                      // />
                      <Tooltip key={`Event-${event.id}`} title={event.title}>
                        <TouchableRipple onPress={() => goToDetail(event)}>
                          <View style={styles.relative}>
                            <View style={styles.imgParent}>
                              <LinearGradient
                                colors={[
                                  'rgba(0, 0, 0, 0)',
                                  'rgba(0, 0, 0, 0.55)',
                                ]}
                                style={globalStyle.bgGradient}
                              />
                              <Image
                                source={{
                                  uri: `https://res.cloudinary.com/arsrsyh/image/upload/v1690531959/${event.picture}`,
                                }}
                                style={globalStyle.imgEvent}
                              />
                            </View>
                            <View style={styles.eventDesc}>
                              <Text style={styles.eventTime}>
                                {moment(event.date).format(
                                  'ddd, D MMMM YYYY, h:mm a',
                                )}
                              </Text>
                              <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={styles.eventTitle}>
                                {event.title}
                              </Text>
                              <View style={styles.arrowIcon}>
                                <Icon
                                  name="arrow-right"
                                  size={20}
                                  color="#02A8A8"
                                />
                              </View>
                            </View>
                          </View>
                        </TouchableRipple>
                      </Tooltip>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View>
                <Text style={{fontSize: 20}}>Discover</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{flexDirection: 'row', gap: 50, padding: 10}}>
                    {category.map(item => {
                      return (
                        <TouchableOpacity
                          onPress={() => getEventByCategory(1, 10, item.name)}
                          key={item.id}>
                          <View
                            style={[styles.listNavEvent, styles.shadowProp]}>
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
                              {item.name === 'Sport' && (
                                <MaterialIcons
                                  name="sports-soccer"
                                  size={20}
                                  color="#02A8A8"
                                />
                              )}
                              {item.name === 'Arts' && (
                                <FontAwesome
                                  name="image"
                                  size={20}
                                  color="#02A8A8"
                                />
                              )}
                              {item.name === 'Outdoors' && (
                                <Foundation
                                  name="trees"
                                  size={20}
                                  color="#02A8A8"
                                />
                              )}
                              {item.name === 'Workshop' && (
                                <MaterialCommunityIcons
                                  name="account-network"
                                  size={20}
                                  color="#02A8A8"
                                />
                              )}
                              {item.name === 'Festival' && (
                                <Feather
                                  name="umbrella"
                                  size={20}
                                  color="#02A8A8"
                                />
                              )}
                              {item.name === 'Fashion' && (
                                <MaterialCommunityIcons
                                  name="human-queue"
                                  size={20}
                                  color="#02A8A8"
                                />
                              )}
                              {item.name === 'Music' && (
                                <Feather
                                  name="music"
                                  size={20}
                                  color="#02A8A8"
                                />
                              )}
                            </View>
                            <Text style={{fontSize: 15}}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              <View style={styles.gapLarge}>
                {getByCategory.map(item => (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={styles.gapLarge}>
                      <View style={globalStyle.dateStyle}>
                        <Text style={globalStyle.date}>
                          {moment(item.date).format('DD')}
                        </Text>
                        <Text>{moment(item.date).format('ddd')}</Text>
                      </View>
                    </View>
                    <TouchableRipple onPress={() => goToDetail(item)}>
                      <View>
                        <View>
                          <View style={styles.imgParent}>
                            <LinearGradient
                              colors={[
                                'rgba(0, 0, 0, 0)',
                                'rgba(0, 0, 0, 0.55)',
                              ]}
                              style={globalStyle.bgGradient}
                            />
                            <Image
                              source={{
                                uri: `https://res.cloudinary.com/arsrsyh/image/upload/v1690531959/${item.picture}`,
                              }}
                              style={globalStyle.imgEvent}
                            />
                          </View>
                        </View>
                        <View style={styles.eventDesc}>
                          <Text style={styles.eventTime}>
                            {moment(item.date).format(
                              'ddd, D MMMM YYYY, h:mm a',
                            )}
                          </Text>
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.eventTitle}>
                            {item.title}
                          </Text>
                          <View style={styles.arrowIcon}>
                            <Feather
                              name="arrow-right"
                              size={20}
                              color="#02A8A8"
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableRipple>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </DrawerLayoutAndroid> */}
    </SafeAreaView>
  );
};

// const StackNav = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="HomeStack" component={Home} />
//       <Stack.Screen name="Event Detail" component={EventDetail} />
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="Checkout" component={Booking} />
//       <Stack.Screen name="Payment" component={Payment} />
//       <Stack.Screen name="Edit Profile" component={EditProfile} />
//       <Stack.Screen name="Change Password" component={ChangePassword} />
//       <Stack.Screen name="Confirm Payment" component={ConfirmPayment} />
//       <Stack.Screen name="History" component={MyBooking} />
//       <Stack.Screen name="Wishlist" component={MyWishlist} />
//       <Stack.Screen name="Manage Event" component={ManageEvent} />
//       <Stack.Screen name="Create" component={Create} />
//       <Stack.Screen name="Update" component={Update} />
//     </Stack.Navigator>
//   );
// };

export default Home;

// Styles
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
    borderWidth: 1,
    borderRadius: 20,
  },
  dateStyleChoose: {
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
  gapLarge: {gap: 25},
  modalContainerStyle: {
    borderRadius: 20,
    backgroundColor: '#fff',
    width: '80%',
    paddingVertical: 20,
  },
  sortText: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
});
