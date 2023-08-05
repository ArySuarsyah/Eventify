import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';
import globalStyle from '../../assets/globalStyles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Password cannot be empty'),
  newPassword: Yup.string().required('Password cannot be empty'),
  confirmPassword: Yup.string().required('Confirm password cannot be empty'),
});

export default function ChangePassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleShowNewPass = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const doChangePassword = values => {
    // dispatch(registerAction(values));
    console.log(values);
  };

  return (
    <ScrollView>
      <View>
        <View style={globalStyle.bookingHeader}>
          <AntDesign name="arrowleft" size={30} color="#02A8A8" />
          <Text style={globalStyle.textHeader}>Change Password</Text>
        </View>
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
});
