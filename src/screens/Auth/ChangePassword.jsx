import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import globalStyle from '../../assets/globalStyles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import http from '../../helper/http';
import {Button, TouchableRipple, Modal, Portal} from 'react-native-paper';
import Feather from 'react-native-vector-icons/dist/Feather';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Password cannot be empty'),
  newPassword: Yup.string().required('Password cannot be empty'),
  confirmPassword: Yup.string().required('Confirm password cannot be empty'),
});

export default function ChangePassword() {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleShowNewPass = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [visible, setVisible] = React.useState(false);

  const doChangePassword = async values => {
    try {
      const form = new URLSearchParams({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmPassword,
      }).toString();

      const {data} = await http(token).patch('/auth/change-password', form);

      if (data.success) {
        setStatus(true);
        setMessage('Change Password Success');
      }
    } catch (error) {
      setStatus(true);
      setMessage(error.message);
    }
  };

  const showModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (status) {
      showModal();
    }
  }, [status, showModal]);

  const handleOkey = () => {
    hideModal();
    navigation.navigate('Profile');
  };

  return (
    <ScrollView>
      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
            style={styles.modalStyle}>
            {message === 'Change Password Success' && (
              <View style={styles.iconSuccess}>
                <Feather name="check" color="white" size={30} />
              </View>
            )}
            {message !== 'Change Password Success' && (
              <View style={styles.iconFailed}>
                <AntDesign name="close" color="white" size={30} />
              </View>
            )}
            <Text style={styles.textCenter}>{message}</Text>
            <TouchableRipple style={styles.buttonHeight} onPress={handleOkey}>
              <Button style={styles.button}>
                <Text style={styles.colorWhite}>Ok</Text>
              </Button>
            </TouchableRipple>
          </Modal>
        </Portal>
        <View>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doChangePassword}>
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={globalStyle.formContainer}>
                <View style={styles.inputParent}>
                  <View style={styles.gap}>
                    <Text>Old Password</Text>
                    <View style={globalStyle.inputPasswordContainer}>
                      <TextInput
                        style={globalStyle.inputPassword}
                        placeholder="Input Old Password"
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange('oldPassword')}
                        onBlur={handleBlur('oldPassword')}
                        value={values.oldPassword}
                      />
                      <TouchableOpacity onPress={handleShowPass}>
                        <Octicons
                          name={showPassword ? 'eye' : 'eye-closed'}
                          size={20}
                          color="#02A8A8"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={globalStyle.errorText}>{errors.password}</Text>
                  )}
                  <View style={styles.gap}>
                    <Text>New Password</Text>
                    <View style={globalStyle.inputPasswordContainer}>
                      <TextInput
                        style={globalStyle.inputPassword}
                        placeholder="Input New Password"
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        value={values.newPassword}
                      />
                      <TouchableOpacity onPress={handleShowNewPass}>
                        <Octicons
                          name={showPassword ? 'eye' : 'eye-closed'}
                          size={20}
                          color="#02A8A8"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={globalStyle.errorText}>{errors.password}</Text>
                  )}
                  <View style={styles.gap}>
                    <Text>Confirm Password</Text>
                    <View style={globalStyle.inputPasswordContainer}>
                      <TextInput
                        style={globalStyle.inputPassword}
                        placeholder="Input Confirm Password"
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                      />
                      <TouchableOpacity onPress={handleShowConfirmPass}>
                        <Octicons
                          name={showConfirmPassword ? 'eye' : 'eye-closed'}
                          size={20}
                          color="#02A8A8"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={globalStyle.buttonContainer}
                  onPress={handleSubmit}>
                  <Text style={globalStyle.textButton}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gap: {gap: 10},
  inputParent: {alignItems: 'center', gap: 20, padding: 10},
  modalStyle: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  iconSuccess: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009acd',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: '30%',
    width: '60%',
    justifyS: 'center',
    alignItems: 'center',
    gap: 20,
  },
  iconFailed: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee6363',
  },
  textCenter: {textAlign: 'center'},
  buttonHeight: {height: 40},
  button: {
    width: '30%',
    backgroundColor: '#018383',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorWhite: {
    color: 'white',
  },
});
