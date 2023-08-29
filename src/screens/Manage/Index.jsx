/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import globalStyle from '../../assets/globalStyles';
import NoTicket from '../../components/NoTicket';
import {TouchableRipple, Modal, Portal, Button} from 'react-native-paper';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import http from '../../helper/http';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {getId} from '../../redux/reducers/event';

export default function ManageEvent() {
  const navigation = useNavigation();
  const [eventData, setEventData] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [message, setMessage] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const getData = useCallback(async () => {
    const {data} = await http(token).get('/events/user');

    setEventData(data.results);
  }, [token]);

  useFocusEffect(() => {
    getData();
  });

  const goToCreate = () => {
    navigation.navigate('Create');
  };

  const handleDelete = async item => {
    try {
      const {data} = await http(token).delete(`/events/manage/delete/${item}`);
      if (data.success) {
        setMessage('Delete Event Success');
        setVisible(true);
      }
    } catch (error) {
      setVisible(true);
      setMessage(error.message);
    }
  };

  const goToUpdate = item => {
    dispatch(getId(item));
    navigation.navigate('Update');
  };

  const handleConfirm = () => {
    setVisible(false);
    navigation.navigate('Manage Event');
  };

  return (
    <ScrollView>
      <View>
        <Portal>
          <Modal
            visible={visible}
            contentContainerStyle={styles.containerModalStyle}
            style={styles.modalStyle}>
            <View style={styles.messageContainer}>
              {message === 'Delete Event Success' ? (
                <MaterialIcons name="check" size={50} color="#018383" />
              ) : (
                <MaterialIcons name="close" size={50} color="#ff6b6b" />
              )}
              <Text>{message}</Text>
              <Button
                mode="elevated"
                theme={{colors: {primary: '#018383'}}}
                onPress={handleConfirm}
                style={styles.sendDataButton}>
                Ok
              </Button>
            </View>
          </Modal>
        </Portal>
        <View style={globalStyle.dataContainer}>
          <TouchableRipple
            onPress={goToCreate}
            style={[globalStyle.monthParent, styles.createEvent]}>
            <View>
              <Text style={globalStyle.monthData}>Create</Text>
            </View>
          </TouchableRipple>
          {eventData.length >= 1 ? (
            eventData.map(event => {
              return (
                <View key={event.id} style={globalStyle.myBokingContaner}>
                  <View style={globalStyle.dateStyle}>
                    <Text style={globalStyle.date}>
                      {moment(event.date).format('DD')}
                    </Text>
                    <Text>{moment(event.date).format('ddd')}</Text>
                  </View>
                  <View style={{gap: 10}}>
                    <Text style={globalStyle.fontData}>{event.title}</Text>
                    <Text>{event.location}</Text>
                    <Text>
                      {moment(event.date).format('ddd, DD MMM, hh:ss a')}
                    </Text>
                    <View style={{flexDirection: 'row', gap: 10}}>
                      <TouchableOpacity onPress={() => goToUpdate(event)}>
                        <Text>Update</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(event.id)}>
                        <Text>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <NoTicket title={'No Event'} description={'Please Create First'} />
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 30,
            }}>
            {/* <TouchableRipple style={styles.buttonPagination} onPress={prevPage}>
              <View>
                <AntDesign name="left" size={20} color="black" />
              </View>
            </TouchableRipple>
            <Text style={{width: 20, textAlign: 'center'}}>{pageData}</Text>
            <TouchableRipple style={styles.buttonPagination} onPress={nextPage}>
              <View>
                <AntDesign name="right" size={20} color="black" />
              </View>
            </TouchableRipple> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  createEvent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  containerModalStyle: {
    backgroundColor: 'white',
    height: '30%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  messageContainer: {justifyContent: 'center', alignItems: 'center', gap: 15},
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPagination: {
    borderWidth: 1,
    borderColor: 'black',
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
