import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import globalStyle from '../../assets/globalStyles';
import React from 'react';
import userImage from '../../assets/Image/userDefault.png';
import LinearGradient from 'react-native-linear-gradient';
import {RadioButton} from 'react-native-paper';

export default function EditProfile() {
  const USER_DEFAULT_IMAGE = Image.resolveAssetSource(userImage).uri;

  const [value, setValue] = React.useState('first');

  return (
    <ScrollView>
      <View>
        <View>
          <View style={globalStyle.userImage}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.55)']}
              style={globalStyle.bgGradient}
            />
            <Image
              source={{
                uri: USER_DEFAULT_IMAGE,
              }}
              width={100}
              height={100}
            />
          </View>
          <View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>userName</Text>
              <TouchableOpacity>
                <Text>edit</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>userName</Text>
              <TouchableOpacity>
                <Text>edit</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>userName</Text>
              <TouchableOpacity>
                <Text>edit</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>userName</Text>
              <TouchableOpacity>
                <Text>edit</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>userName</Text>
              <TouchableOpacity>
                <Text>edit</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Gender</Text>
              <RadioButton.Group
                onValueChange={newValue => setValue(newValue)}
                value={value}
                style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>Male</Text>
                  <RadioButton value="first" />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text>Female</Text>
                  <RadioButton value="second" />
                </View>
              </RadioButton.Group>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
