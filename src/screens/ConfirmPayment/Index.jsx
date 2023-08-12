/* eslint-disable react/no-unstable-nested-components */
import {View, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {TouchableRipple, Modal, Portal, Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import globalStyle from '../../assets/globalStyles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {useSelector} from 'react-redux';
import http from '../../helper/http';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import jwtDecode from 'jwt-decode';
import Feather from 'react-native-vector-icons/dist/Feather';

export default function ConfirmPayment() {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const {dataPayment, paymentMethod} = useSelector(state => state.payment);
  const event = useSelector(state => state.event.data);
  const {id} = jwtDecode(token);

  const [messsage, setMessage] = useState('');
  const [status, setStatus] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  const showModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    paymentMethod === 'card' && setPaymentId(1);
    paymentMethod === 'Bank Transfer' && setPaymentId(2);
    paymentMethod === 'Retail' && setPaymentId(3);
    paymentMethod === 'E-Money' && setPaymentId(4);
  }, [paymentMethod, setPaymentId]);

  const checkoutPayment = async () => {
    try {
      const reserv = new URLSearchParams({
        eventId: event.id,
        userId: id,
        statusId: 1,
        paymentMethodId: paymentId,
      }).toString();

      const {data} = await http(token).post('payment/create', reserv);
      if (data.success) {
        const reservTicket = new URLSearchParams({
          reservationId: data.results.reservationsId,
          quantityId: dataPayment.quantity,
          sectionId: dataPayment.section,
        }).toString();

        const reserTick = await http(token).post(
          '/reservationTicket',
          reservTicket,
        );
        setMessage('Transaction success!!');
        setStatus(true);
        return reserTick.results;
      }
    } catch (error) {
      setStatus(true);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (status) {
      showModal();
    }
  }, [status, showModal]);

  const handleOkey = () => {
    hideModal();
    navigation.navigate('MyBooking');
  };

  return (
    <>
      <ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
            style={styles.modalStyle}>
            {messsage === 'Transaction success!!' && (
              <View style={styles.iconSuccess}>
                <Feather name="check" color="white" size={30} />
              </View>
            )}
            {messsage !== 'Transaction success!!' && (
              <View style={styles.iconFailed}>
                <AntDesign name="close" color="white" size={30} />
              </View>
            )}
            <Text style={styles.textCenter}>{messsage}</Text>
            <TouchableRipple style={styles.buttonHeight} onPress={handleOkey}>
              <Button style={styles.button}>
                <Text style={styles.colorWhite}>Ok</Text>
              </Button>
            </TouchableRipple>
          </Modal>
        </Portal>
        <View style={styles.container}>
          <View style={globalStyle.bookingHeader}>
            <AntDesign name="arrowleft" size={30} color="#02A8A8" />
            <Text style={globalStyle.textHeader}>Confirm</Text>
          </View>
          <View style={styles.accordionParent}>
            <View style={styles.confirmData}>
              <Text style={styles.fontLarge}>Event Title:</Text>
              <Text style={styles.fontSm}>{event.title}</Text>
            </View>
            <View style={styles.confirmData}>
              <Text style={styles.fontLarge}>Location :</Text>
              <Text style={styles.fontSm}>{event.location}</Text>
            </View>
            <View style={styles.confirmData}>
              <Text style={styles.fontLarge}>Category :</Text>
              <Text style={styles.fontSm}>{event.category}</Text>
            </View>
            <View style={styles.confirmData}>
              <Text style={styles.fontLarge}>Section</Text>
              <Text style={styles.fontSm}>
                {dataPayment.section === '4' && 'Reguler'}
                {dataPayment.section === '5' && 'VIP'}
                {dataPayment.section === '6' && 'VVIP'}
              </Text>
            </View>
            <View style={styles.confirmData}>
              <Text style={styles.fontLarge}>Quantity :</Text>
              <Text style={styles.fontSm}>{dataPayment.quantity}</Text>
            </View>
            <View style={styles.confirmData}>
              <Text style={styles.fontLarge}>Payment Method :</Text>
              <Text style={styles.fontSm}>{paymentMethod}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.footer, styles.shadowProp]}>
        <View>
          <Text style={styles.fontSizeCard}>Total Payment</Text>
          <View style={styles.totalPayment}>
            <Foundation name="dollar" size={30} color="#3366FF" />
            <Text style={styles.fontSizeCard}>{dataPayment.price}</Text>
          </View>
        </View>
        <TouchableRipple style={styles.paymentButton} onPress={checkoutPayment}>
          <Text style={styles.colorWhite}>Confirm</Text>
        </TouchableRipple>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  accordionParent: {
    backgroundColor: 'white',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    padding: 40,
    height: '90%',
    gap: 50,
  },
  colorWhite: {
    color: 'white',
  },
  paymentButton: {
    backgroundColor: '#018383',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  container: {
    height: '100%',
    marginBottom: 80,
  },
  gapBankOption: {gap: 20},
  fontSizeCard: {fontSize: 20},
  footer: {
    flexDirection: 'row',
    gap: 20,
    height: 80,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  totalPayment: {flexDirection: 'row', alignItems: 'center', gap: 10},
  fontLarge: {
    fontSize: 25,
    color: '#84A98C',
  },
  fontSm: {
    fontSize: 20,
    color: '#8EDECA',
  },
  confirmData: {
    gap: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 5,
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
  modalStyle: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonHeight: {height: 40},
  iconSuccess: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009acd',
  },
  button: {
    width: '30%',
    backgroundColor: '#018383',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {textAlign: 'center'},
  iconFailed: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee6363',
  },
});
