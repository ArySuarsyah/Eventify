/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, Image } from 'react-native';
import React, {  } from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import LinearGradient from 'react-native-linear-gradient';
import globalStyle from '../../assets/globalStyles';
import userGroup from '../../assets/Image/userGroup.png';
import map from '../../assets/Image/map.png';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ImageEvent from '../../assets/Image/advanture.jpg';
import { useNavigation } from '@react-navigation/native';


export default function Index() {
  const eventId = useSelector(state => state.event.data);
  const userGroupImg = Image.resolveAssetSource(userGroup).uri;
  const mapImg = Image.resolveAssetSource(map).uri;
  const evetnImg = Image.resolveAssetSource(ImageEvent).uri;
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      {/* <ScrollView> */}
      <View>
        <View style={{height: '40%', position: 'relative'}}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.55)']}
            style={globalStyle.bgGradient}
          />
          {/* <Image
            source={{
              uri: `http://localhost:8888/uploads/${eventId.picture}`,
            }}
            style={globalStyle.imgEvent}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 10,
            }}>
            <AntDesign name="arrowleft" size={30} color="#02A8A8" />
            <AntDesign name="hearto" size={30} color="#02A8A8" />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: '20%',
              gap: 30,
              paddingHorizontal: 20,
            }}>
            <Text style={{fontSize: 30, color: '#222', maxWidth: 200}}>
              {eventId.category}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Feather name="map-pin" size={20} />
              <Text style={{fontSize: 20}}>{eventId.location}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Feather name="clock" size={20} />
              <Text style={{fontSize: 20}}>
                {' '}
                {moment(eventId.date).format('ddd, D MMMM YYYY, h:mm a')}
              </Text>
            </View>
            <View style={{gap: 10}}>
              <Text style={{fontSize: 15}}>Attendees</Text>
              <Image
                source={{
                  uri: userGroupImg,
                }}
                style={{width: 70, height: 24}}
              />
            </View>
          </View>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20, gap: 10}}>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 30}}>Event Detail</Text>
            <Text style={{fontSize: 20}}>{eventId.description}</Text>
            <Text>Read More</Text>
          </View>
          <View style={{gap: 5}}>
            <Text style={{fontSize: 20}}>Location</Text>
            <View
              style={{
                width: '100%',
                height: 500,
                position: 'relative',
              }}>
              <Image
                source={{
                  uri: mapImg,
                }}
                style={{width: '100%', height: 200}}
              />
              <Button
                style={{
                  backgroundColor: '#018383',
                  position: 'absolute',
                  width: '100%',
                  height: '10%',
                  justifyContent: 'center',
                  bottom: '70%',
                  left: 0,
                }}
                onPress={() => navigation.navigate('Booking')}>
                <Text style={{color: '#fff'}}>Buy Tickets!</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
