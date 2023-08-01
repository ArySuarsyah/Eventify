/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from '../../assets/globalStyles';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ForgotPassword() {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.registerHeader}>
          <Text style={styles.authTitle}>Forgot Password</Text>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subtitle}>
              You'll get mail soon on your email
            </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputParent}>
            <TextInput style={styles.input} placeholder="Email" />
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textButton}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
