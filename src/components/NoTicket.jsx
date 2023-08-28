import {View, Text} from 'react-native';
import React from 'react';
import globalStyle from '../assets/globalStyles';

export default function NoTicket(props) {
  return (
    <View style={globalStyle.noTicket}>
      <Text style={globalStyle.fontLarge}>{props.title}</Text>
      <Text style={globalStyle.detailNoTicket}>{props.description}</Text>
    </View>
  );
}
