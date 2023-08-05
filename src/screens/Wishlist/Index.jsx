/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import globalStyle from '../../assets/globalStyles';
import moment from 'moment';
import NoTicket from '../../components/NoTicket';

export default function MyWishlist() {
  return (
    <View>
      <View style={globalStyle.bookingHeader}>
        <AntDesign name="arrowleft" size={30} color="#02A8A8" />
        <Text style={globalStyle.textHeader}>My Wishlist</Text>
      </View>
      <View style={globalStyle.dataContainer}>
        <View style={globalStyle.myBokingContaner}>
          <View style={{gap: 25}}>
            <View style={globalStyle.dateStyle}>
              <Text style={globalStyle.date}>15</Text>
              <Text>Wed</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign name="hearto" size={25} color="#02A8A8" />
            </View>
          </View>
          <View style={{gap: 10}}>
            <Text style={globalStyle.fontData}>Sights & Sounds Exhibition</Text>
            <Text>Jakarta, Indonesia</Text>
            <Text>Wed, 15 Nov, 4:00 PM</Text>
            <TouchableOpacity>
              <Text>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <NoTicket /> */}
      </View>
    </View>
  );
}
