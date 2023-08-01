import {View, Text, TouchableOpacity} from 'react-native';
import React, {Children} from 'react';
import globalStyle from '../assets/globalStyles';

export default function Button({children, ...rest}) {
  return (
    <TouchableOpacity {...rest} style={globalStyle.buttonContainer}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
