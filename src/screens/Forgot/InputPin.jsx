/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from '../../assets/globalStyles';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PinInput from '../../components/PinInput';

export default function InputPin() {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.registerHeader}>
          <Text style={styles.authTitle}>Input Pin</Text>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subtitle}>
              You'll get mail soon on your email
            </Text>
          </View>
        </View>
        <PinInput />
      </View>
    </SafeAreaView>
  );
}
