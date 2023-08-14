/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import LinearGradient from 'react-native-linear-gradient';
import globalStyle from '../../assets/globalStyles';
import userGroup from '../../assets/Image/userGroup.png';
import map from '../../assets/Image/map.png';
import {Button, TouchableRipple} from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import http from '../../helper/http';

export default function Index() {
  const eventId = useSelector(state => state.event.data);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const {id} = jwt_decode(token);
  const userGroupImg = Image.resolveAssetSource(userGroup).uri;
  const mapImg = Image.resolveAssetSource(map).uri;
  const navigation = useNavigation();
  const [readMore, setReadMore] = React.useState(false);
  const [iconWishlist, setIconWishlist] = React.useState(false);

  const handleReadmore = () => {
    setReadMore(!readMore);
  };

  const addToWishlist = async () => {
    const form = new URLSearchParams();
    form.append('eventId', eventId.id);
    form.append('userId', id);
    console.log(form);
    const {data} = await http(token).post('/wishlist', form.toString());
    if (data.success) {
      setIconWishlist(!iconWishlist);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: '100%',
            position: 'relative',
            backgroundColor: 'black',
          }}>
          <View style={{height: 400, zIndex: 10}}>
            <View style={styles.navigation}>
              <AntDesign name="arrowleft" size={30} color="#02A8A8" />
              <TouchableHighlight onPress={addToWishlist}>
                <View>
                  {iconWishlist && (
                    <AntDesign name="heart" size={30} color="#02A8A8" />
                  )}
                  {!iconWishlist && (
                    <AntDesign name="hearto" size={30} color="#02A8A8" />
                  )}
                </View>
              </TouchableHighlight>
            </View>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']}
              style={globalStyle.bgGradient}
            />
            <Image
              source={{
                uri: `https://res.cloudinary.com/arsrsyh/image/upload/v1690531959/${eventId.picture}`,
              }}
              style={globalStyle.imgEvent}
            />
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingTop: 10,
                backgroundColor:"black",
              }}>

            </View> */}
            <View
              style={{
                position: 'absolute',
                bottom: '20%',
                gap: 30,
                paddingHorizontal: 20,
                zIndex: 1,
              }}>
              <Text style={{fontSize: 30, color: '#cecece', maxWidth: 200}}>
                {eventId.category}
              </Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Feather name="map-pin" size={20} color="#cecece" />
                <Text style={{fontSize: 20, color: '#cecece'}}>
                  {eventId.location}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Feather name="clock" size={20} color="#cecece" />
                <Text style={{fontSize: 20, color: '#dedede'}}>
                  {moment(eventId.date).format('ddd, D MMMM YYYY, h:mm a')}
                </Text>
              </View>
              <View style={{gap: 10}}>
                <Text style={{fontSize: 15, color: '#cecece'}}>Attendees</Text>
                <Image
                  source={{
                    uri: userGroupImg,
                  }}
                  style={{width: 70, height: 24}}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              gap: 20,
              borderWidth: 1,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: 'white',
            }}>
            <View style={{gap: 10}}>
              <Text style={{fontSize: 30}}>Event Detail</Text>
              <Text numberOfLines={readMore ? 6 : 20} style={{fontSize: 20}}>
                {eventId.description}
              </Text>
              <TouchableHighlight>
                <Text onPress={handleReadmore}>
                  {readMore ? 'Read More' : 'Show Less'}
                </Text>
              </TouchableHighlight>
            </View>
            <View style={{gap: 10}}>
              <Text style={{fontSize: 25}}>Location</Text>
              <View
                style={{
                  width: '100%',
                  height: 210,
                  position: 'relative',
                }}>
                <Image
                  source={{
                    uri: mapImg,
                  }}
                  style={{width: '100%', height: 200}}
                />
                <View style={styles.buttonBuyParent}>
                  <Button style={styles.buttonStyle} onPress={addToWishlist}>
                    <Text style={{color: '#fff'}}>Add To Wishlist</Text>
                  </Button>
                  <Button
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Booking')}>
                    <Text style={{color: '#fff'}}>Buy Tickets!</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navigation: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  buttonBuyParent: {
    position: 'absolute',
    width: '90%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '15%',
    left: '5%',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 10,
  },
  buttonStyle: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    backgroundColor: '#018383',
  },
});
