/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableRipple} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import globalStyle from '../../assets/globalStyles';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import http from '../../helper/http';

export default function MyBooking() {
  const navigation = useNavigation();
  const [dataHistory, setDataHistory] = useState([]);
  const token = useSelector(state => state.auth.token);
  const getData = useCallback(async () => {
    const {data} = await http(token).get('/history');

    setDataHistory(data.results);
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View>
      <View style={globalStyle.bookingHeader}>
        <TouchableRipple onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="#02A8A8" />
        </TouchableRipple>
        <Text style={globalStyle.textHeader}>My Booking</Text>
      </View>
      <View style={globalStyle.dataContainer}>
        <View style={globalStyle.monthParent}>
          <View style={globalStyle.monthStyle}>
            <MaterialIcons name="calendar-month" size={30} color="#02A8A8" />
            <Text style={globalStyle.monthData}>{moment().format('MMMM')}</Text>
          </View>
        </View>
        {dataHistory.map(history => {
          return (
            <View key={history.id} style={globalStyle.myBokingContaner}>
              <View style={globalStyle.dateStyle}>
                <Text style={globalStyle.date}>15</Text>
                <Text>Wed</Text>
              </View>
              <View style={{gap: 10}}>
                <Text style={globalStyle.fontData}>{history.title}</Text>
                <Text>{history.location}</Text>
                <Text>
                  {moment(history.createdAt).format('ddd, DD MMM YYYY, h:mm a')}
                </Text>
                <TouchableOpacity>
                  <Text>detail</Text>
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
