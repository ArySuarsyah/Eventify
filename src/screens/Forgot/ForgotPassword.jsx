/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from '../../assets/globalStyles';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';
import http from '../../helper/http';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});

export default function ForgotPassword() {
  const navigation = useNavigation();
  const doForgot = async values => {
    try {
      const form = new URLSearchParams({
        email: values.email,
      }).toString();
      const {data} = await http().post('/auth/forgot-password', form);
      if (data.success) {
        console.log(data.results);
        navigation.navigate('InputPin');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

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
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={doForgot}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputParent}>
                <TextInput
                  onChangeText={handleChange('email')}
                  handleBlur={handleBlur('email')}
                  values={values.email}
                  style={styles.input}
                  placeholder="Email"
                />
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonContainer}>
                <Text style={styles.textButton}>Log In</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}
