/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import globalStyle from '../../assets/globalStyles';
import moment from 'moment';
import http from '../../helper/http';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';

export default function MyWishlist() {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state.auth.token);
  const [wishlistData, setWishlistData] = useState([]);

  const getWishlist = useCallback(async () => {
    const {data} = await http(token).get('/wishlist/list');
    setWishlistData(data.results);
  }, [token]);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  return (
    <View>
      <View style={globalStyle.bookingHeader}>
        <TouchableRipple onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="#02A8A8" />
        </TouchableRipple>
        <Text style={globalStyle.textHeader}>{route.name}</Text>
      </View>
      <View style={globalStyle.dataContainer}>
        {wishlistData.map(item => {
          return (
            <View key={`item-${item.id}`} style={globalStyle.myBokingContaner}>
              <View style={{gap: 25}}>
                <View style={globalStyle.dateStyle}>
                  <Text style={globalStyle.date}>
                    {moment(item.date).format('DD')}
                  </Text>
                  <Text>{moment(item.date).format('ddd')}</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <AntDesign name="heart" size={25} color="#02A8A8" />
                </View>
              </View>
              <View style={{gap: 10}}>
                <Text style={globalStyle.fontData}>{item.title}</Text>
                <Text>{item.location}</Text>
                <Text>{moment(item.date).format('ddd, DD MMM, hh:ss a')}</Text>
                <TouchableOpacity>
                  <Text>Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        {/* <NoTicket /> */}
      </View>
    </View>
  );
}
