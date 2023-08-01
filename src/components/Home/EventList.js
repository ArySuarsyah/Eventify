import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {Tooltip} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import globalStyle from '../../assets/globalStyles';
import {getId} from '../../redux/reducers/event';
import {useDispatch} from 'react-redux';

export default function EventList({title, date, image, event, styles}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goToDetail = val => {
    dispatch(getId(val));
    navigation.navigate('EventDetail');
  };
  return (
    <Tooltip title={title}>
      <View style={styles.relative}>
        <View style={styles.imgParent}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.55)']}
            style={globalStyle.bgGradient}
          />
          <Image
            source={{
              uri: image,
            }}
            style={globalStyle.imgEvent}
          />
        </View>
        <View style={styles.eventDesc}>
          <Text style={styles.eventTime}>
            {moment(date).format('ddd, D MMMM YYYY, h:mm a')}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.eventTitle}>
            {title}
          </Text>
          <TouchableOpacity onPress={() => goToDetail(event)}>
            <View style={styles.arrowIcon}>
              <Icon name="arrow-right" size={20} color="#02A8A8" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Tooltip>
  );
}
