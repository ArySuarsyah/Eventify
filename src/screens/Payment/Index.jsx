/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import React from 'react';
import globalStyle from '../../assets/globalStyles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import {List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectPayment} from '../../redux/reducers/paymentReducers';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import retail from '../../assets/Image/market.png';
import card from '../../assets/Image/card.png';
import bri from '../../assets/Image/bri.png';
import bni from '../../assets/Image/bni.png';

export default function Payment() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.payment.dataPayment);
  const [expandedCard, setExpandedCard] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [expandedEmoney, setExpandedEmoney] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('card1');
  const [paymentMethod, setPaymentMethod] = React.useState('');

  const handlePress = () => setExpanded(!expanded);
  const handlePressRetail = () => {
    setPaymentMethod('Retail');
    setOpen(!open);
  };
  const handlePressEmoney = () => {
    setPaymentMethod('E-Money');
    setExpandedEmoney(!expandedEmoney);
  };
  const handlePressOnCard = () => setExpandedCard(!expandedCard);

  const market = Image.resolveAssetSource(retail).uri;
  const briLogo = Image.resolveAssetSource(bri).uri;
  const bniLogo = Image.resolveAssetSource(bni).uri;

  const cardData = ['card', 'card', 'card'];

  const handleCard = item => {
    setSelectedCard(item);
    setPaymentMethod(item);
  };
  // const radioButtons = React.useMemo(
  //   () => [
  //     {
  //       id: '1',
  //       value: 'option1',
  //     },
  //   ],
  //   [],
  // );
  const checkoutPayment = () => {
    dispatch(selectPayment(paymentMethod));
    navigation.navigate('ConfirmPayment');
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={globalStyle.bookingHeader}>
            <TouchableRipple onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color="#02A8A8" />
            </TouchableRipple>
            <Text style={globalStyle.textHeader}>Payment</Text>
          </View>
          <View style={styles.accordionParent}>
            <List.Section
              title="Payment Method"
              titleStyle={styles.fontSizeCard}>
              <List.Accordion
                style={styles.accordionStyle}
                title="Card"
                left={props => (
                  <View style={styles.iconTitleAccordion}>
                    <View style={styles.radioButtons}>
                      <View
                        style={
                          paymentMethod === selectedCard
                            ? styles.selectedRadio
                            : styles.hidden
                        }
                      />
                    </View>
                    <Ionicons name="card-sharp" size={30} color="#884DFF" />
                  </View>
                )}
                onPress={handlePressOnCard}
                expanded={expandedCard}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.cardParent}>
                    {cardData.map((item, index) => {
                      return (
                        <TouchableRipple
                          key={index}
                          onPress={() => handleCard(item)}>
                          <View value={item} style={styles.radioCard}>
                            <View style={styles.selectValue}>
                              <View
                                style={
                                  paymentMethod === item
                                    ? styles.circleRadio
                                    : ''
                                }>
                                <Text> </Text>
                              </View>
                            </View>
                            <Image source={card} width={200} height={100} />
                          </View>
                        </TouchableRipple>
                      );
                    })}
                  </View>
                </ScrollView>
              </List.Accordion>
              <List.Accordion
                style={styles.accordionStyle}
                title="Bank Transfer"
                onPress={() => setPaymentMethod('Bank Transfer')}
                left={props => (
                  <View style={styles.iconTitleAccordion}>
                    <View style={styles.radioButtons}>
                      <View
                        style={
                          paymentMethod !== 'Bank Transfer'
                            ? styles.hidden
                            : styles.selectedRadio
                        }
                      />
                    </View>
                    <FontAwesome name="bank" size={30} color="#FC1055" />
                  </View>
                )}
                expanded={expanded}>
                <View style={styles.gapBankOption}>
                  <View style={styles.bankValue}>
                    <Image source={{uri: briLogo}} width={20} height={20} />
                    <Text>BRI (Bank Rakyat Indonesia)</Text>
                  </View>
                  <View style={styles.bankValue}>
                    <Image source={{uri: bniLogo}} width={20} height={20} />
                    <Text>BNI (Bank Nasional Indonesia)</Text>
                  </View>
                </View>
              </List.Accordion>
              <List.Accordion
                style={styles.accordionStyle}
                title="Retail"
                left={props => (
                  <View style={styles.iconTitleAccordion}>
                    <View style={styles.radioButtons}>
                      <View
                        style={
                          paymentMethod !== 'Retail'
                            ? styles.hidden
                            : styles.selectedRadio
                        }
                      />
                    </View>
                    <FontAwesome6 name="shop" size={30} color="#FF8900" />
                  </View>
                )}
                expanded={open}
                onPress={handlePressRetail}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion>
              <List.Accordion
                style={styles.accordionStyle}
                title="E-Money"
                left={props => (
                  <View style={styles.iconTitleAccordion}>
                    <View style={styles.radioButtons}>
                      <View
                        style={
                          paymentMethod !== 'E-Money'
                            ? styles.hidden
                            : styles.selectedRadio
                        }
                      />
                    </View>
                    <MaterialIcons
                      name="attach-money"
                      size={30}
                      color="#3366FF"
                    />
                  </View>
                )}
                expanded={expandedEmoney}
                onPress={handlePressEmoney}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion>
            </List.Section>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.fontSizeCard}>Total Payment</Text>
          <View style={styles.totalPayment}>
            <Foundation name="dollar" size={30} color="#3366FF" />
            <Text style={styles.fontSizeCard}>{paymentData.price}</Text>
          </View>
        </View>
        <TouchableRipple style={styles.paymentButton} onPress={checkoutPayment}>
          <Text style={styles.colorWhite}>Payment</Text>
        </TouchableRipple>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  accordionStyle: {backgroundColor: 'white', padding: 10},
  radioButtons: {
    width: 20,
    height: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    backgroundColor: 'black',
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  hidden: {
    backgroundColor: 'white',
  },
  accordionParent: {
    backgroundColor: 'white',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    padding: 20,
    height: '100%',
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
    borderWidth: 1,
  },
  container: {
    height: Dimensions.get('screen').height,
    marginBottom: 80,
  },
  iconTitleAccordion: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cardParent: {
    flexDirection: 'row',
    gap: 20,
    paddingRight: 50,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bankValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
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
  radioCard: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  selectValue: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleRadio: {
    backgroundColor: 'black',
    width: 15,
    height: 15,
    borderRadius: 15,
  },
});
