/* eslint-disable radix */
import React from 'react';
import {useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {sendPin} from '../redux/reducers/authReducers';
import {useNavigation} from '@react-navigation/native';

export default function PinInput() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pinValues, setPinValues] = React.useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });

  const pinInput = {
    input1: React.useRef(),
    input2: React.useRef(),
    input3: React.useRef(),
    input4: React.useRef(),
    input5: React.useRef(),
    input6: React.useRef(),
  };

  const changeInput = (text, inputName) => {
    if (text.length > 0) {
      if (parseInt(inputName) < 6) {
        pinInput[`input${parseInt(inputName) + 1}`].current.focus();
      }
    } else {
      if (parseInt(inputName) > 1) {
        if (!pinInput[`input${parseInt(inputName) - 1}`].current.value) {
          pinInput[`input${parseInt(inputName) - 1}`].current.focus();
        }
      }
    }

    const newPinValues = {...pinValues, [inputName]: text};
    setPinValues(newPinValues);
  };

  const handleSubmit = () => {
    const pinData = Object.values(pinValues).join('');
    dispatch(sendPin(pinData));
    navigation.navigate('ResetPassword');
  };

  return (
    <View>
      <View style={styles.container}>
        <View>
          <TextInput
            color="#000"
            required
            onChangeText={text => changeInput(text, '1')}
            ref={pinInput.input1}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            color="#000"
            required
            onChangeText={text => changeInput(text, '2')}
            ref={pinInput.input2}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            color="#000"
            required
            onChangeText={text => changeInput(text, '3')}
            ref={pinInput.input3}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            color="#000"
            required
            onChangeText={text => changeInput(text, '4')}
            ref={pinInput.input4}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            color="#000"
            required
            onChangeText={text => changeInput(text, '5')}
            ref={pinInput.input5}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            color="#000"
            required
            onChangeText={text => changeInput(text, '6')}
            ref={pinInput.input6}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.textButton}>Send Code</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10,
  },
  input: {
    color: 'black',
    borderRadius: 5,
    backgroundColor: '#dedede',
    borderWidth: 1,
    textAlign: 'center',
    width: 48,
    height: 48,
  },
  buttonContainer: {
    backgroundColor: '#018383',
    padding: 10,
    borderRadius: 5,
    width: 315,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textButton: {
    height: 20,
    color: '#fff',
  },
});
