/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import globalStyles from '../../assets/globalStyles';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';
import http from '../../helper/http';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  newPassword: Yup.string().required('Password cannot be empty'),
  confirmNewPassword: Yup.string().required('Confirm Password cannot be empty'),
});

export default function ResetPassword() {
  const pin = useSelector(state => state.auth.pin);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowCoonfirmPassword] = useState(false);
  const navigation = useNavigation();

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPass = () => {
    setShowCoonfirmPassword(!showConfirmPassword);
  };

  const doReset = async values => {
    const form = new URLSearchParams({
      code: pin,
      email: values.email,
      password: values.newPassword,
      confirmPassword: values.confirmNewPassword,
    }).toString();
    const {data} = await http().post('/auth/reset-password', form);
    if (data.success) {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={globalStyles.container}>
        <View style={globalStyles.registerHeader}>
          <Text style={globalStyles.authTitle}>Reset Your Password</Text>
          {/* <View style={globalStyles.subTitleContainer}>
            <Text style={globalStyles.subtitle}>
              You'll get mail soon on your email
            </Text>
          </View> */}
        </View>
        <Formik
          initialValues={{
            email: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={doReset}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={globalStyles.formContainer}>
              <View style={styles.inputParent}>
                <TextInput
                  onChangeText={handleChange('email')}
                  handleBlur={handleBlur('email')}
                  values={values.email}
                  style={globalStyles.input}
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputPasswordContainer}>
                <TextInput
                  style={globalStyles.inputPassword}
                  placeholder="New Password"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                />
                <TouchableOpacity onPress={handleShowPass}>
                  <Octicons
                    name={showPassword ? 'eye' : 'eye-closed'}
                    size={20}
                    color="#02A8A8"
                  />
                </TouchableOpacity>
              </View>
              {errors.newPassword && touched.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}
              <View style={styles.inputPasswordContainer}>
                <TextInput
                  style={globalStyles.inputPassword}
                  placeholder="Confirm New Password"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={handleChange('confirmNewPassword')}
                  onBlur={handleBlur('confirmNewPassword')}
                  value={values.confirmNewPassword}
                />
                <TouchableOpacity onPress={handleShowConfirmPass}>
                  <Octicons
                    name={showConfirmPassword ? 'eye' : 'eye-closed'}
                    size={20}
                    color="#02A8A8"
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmNewPassword}
                </Text>
              )}
              <TouchableOpacity
                onPress={handleSubmit}
                style={globalStyles.buttonContainer}>
                <Text style={globalStyles.textButton}>Log In</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputPasswordContainer: {
    borderWidth: 1,
    marginTop: 20,
    width: 315,
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
    height: 60,
    borderColor: '#02A8A8',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    padding: 0,
    marginHorizontal: 30,
  },
  inputParent: {alignItems: 'center', gap: 20},
});
