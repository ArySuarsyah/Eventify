import {View, Text} from 'react-native';
import React from 'react';
import globalStyle from '../assets/globalStyles';

export default function NoTicket() {
  return (
    <View style={globalStyle.noTicket}>
      <Text style={globalStyle.fontLarge}>No tickets bought</Text>
      <Text style={globalStyle.detailNoTicket}>
        It appears you haven't bought any tickets yet. Maybe try searching
        these?
      </Text>
    </View>
  );
}
