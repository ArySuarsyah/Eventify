/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import globalStyle from '../../assets/globalStyles';
import moment from 'moment';
import NoTicket from '../../components/NoTicket';
import {TouchableRipple} from 'react-native-paper';

export default function ManageEvent() {
  return (
    <View>
      <View style={globalStyle.bookingHeader}>
        <AntDesign name="arrowleft" size={30} color="#02A8A8" />
        <Text style={globalStyle.textHeader}>Manage</Text>
      </View>
      <View style={globalStyle.dataContainer}>
        <TouchableRipple>
          <View style={[globalStyle.monthParent, styles.createEvent]}>
            <Text style={globalStyle.monthData}>Create</Text>
          </View>
        </TouchableRipple>
        <View style={globalStyle.myBokingContaner}>
          <View style={globalStyle.dateStyle}>
            <Text style={globalStyle.date}>15</Text>
            <Text>Wed</Text>
          </View>
          <View style={{gap: 10}}>
            <Text style={globalStyle.fontData}>Sights & Sounds Exhibition</Text>
            <Text>Jakarta, Indonesia</Text>
            <Text>Wed, 15 Nov, 4:00 PM</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity>
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <NoTicket /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  createEvent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
