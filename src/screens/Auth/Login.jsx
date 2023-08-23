/* eslint-disable no-unused-vars */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from '../../assets/globalStyles';
import {Link} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
import {asyncLogin as loginAction} from '../../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Portal, Modal, Button, TouchableRipple} from 'react-native-paper';
import {deleteMessage} from '../../redux/reducers/authReducers';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password cannot be empty'),
});

export default function Login() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.loginMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const doLogin = values => {
    dispatch(loginAction(values));
  };

  useEffect(() => {
    if (errorMessage) {
      showModal();
    }
  }, [errorMessage]);

  const handleOkey = () => {
    // clearData();
    dispatch(deleteMessage());
    hideModal();
  };

  return (
    <SafeAreaView style={styles.saveArea}>
      <ScrollView style={styles.outer}>
        <View style={styles.container}>
          <View style={styles.registerHeader}>
            <Text style={styles.authTitle}>Log In</Text>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subtitle}>Hi, Welcome back to Eventify!</Text>
            </View>
          </View>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.containerStyle}
              style={styles.modalStyle}>
              {errorMessage && (
                <View style={styles.iconFailed}>
                  <AntDesign name="close" color="white" size={30} />
                </View>
              )}
              <Text style={styles.textCenter}>{errorMessage}</Text>
              <TouchableRipple style={styles.buttonHeight} onPress={handleOkey}>
                <Button style={styles.button}>
                  <Text style={styles.colorWhite}>Ok</Text>
                </Button>
              </TouchableRipple>
            </Modal>
          </Portal>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doLogin}>
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
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <View style={styles.inputPasswordContainer}>
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      style={styles.inputPassword}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      value={values.password}
                    />
                    <TouchableOpacity onPress={handleShowPass}>
                      <Octicons
                        name={showPassword ? 'eye' : 'eye-closed'}
                        size={24}
                        color="#02A8A8"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.forgotContainer}>
                  <Link to={'/ForgotPassword'} style={styles.forgotLink}>
                    Forgot Password?
                  </Link>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.buttonContainer}>
                  <Text style={styles.textButton}>Log In</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.iconContainer}>
            <Text style={styles.iconTitle}>or sign in with</Text>
            <View style={styles.iconParent}>
              <View style={styles.iconLogin}>
                <AntDesign name="google" size={30} color="#02A8A8" />
              </View>
              <View style={styles.iconLogin}>
                <MaterialIcons name="facebook" size={30} color="#02A8A8" />
              </View>
              <View style={styles.iconLogin}>
                <FontAwesome5 name="fingerprint" size={30} color="#02A8A8" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
