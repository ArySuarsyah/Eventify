/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import styles from '../../assets/globalStyles';
import {Link} from '@react-navigation/native';
import React, {useState} from 'react';
import {Checkbox} from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import AlertMessage from '../../components/AlertMessage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {asyncRegister as registerAction} from '../../redux/actions/auth';
import {login} from '../../redux/reducers/authReducers';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password cannot be empty'),
  confirmPassword: Yup.string().required('Confirm password cannot be empty'),
});

export default function Register() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowCoonfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const token = useSelector(state => state.auth.token);

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPass = () => {
    setShowCoonfirmPassword(!showConfirmPassword);
  };

  const doRegister = values => {
    dispatch(registerAction(values));
    console.log(values);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.registerHeader}>
            <Text style={styles.authTitle}>Sign Up</Text>
            <View style={styles.subTitleContainer}>
              <AlertMessage />
              <Text style={styles.subtitle}>Already have an account?</Text>
              <TouchableOpacity>
                <Link to="/Login" style={styles.subtitleLink}>
                  Log In
                </Link>
              </TouchableOpacity>
            </View>
          </View>
          {errorMessage && (
            <AlertMessage variant="error">{errorMessage}</AlertMessage>
          )}
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doRegister}>
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <View style={{alignItems: 'center', gap: 20, padding: 10}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                  />
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
                      style={styles.inputPassword}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity onPress={handleShowPass}>
                      <Octicons
                        name={showPassword ? 'eye' : 'eye-closed'}
                        size={20}
                        color="#02A8A8"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <View style={styles.inputPasswordContainer}>
                    <TextInput
                      style={styles.inputPassword}
                      placeholder="Confirm Password"
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
                <View style={styles.checkBoxContainer}>
                  <Checkbox
                    color="#02A8A8"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                  <Text style={styles.text}>Accept terms and condition</Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={handleSubmit}>
                  <Text style={styles.textButton}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
