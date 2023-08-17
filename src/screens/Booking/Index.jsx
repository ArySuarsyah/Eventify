import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import globalStyle from '../../assets/globalStyles';
import stadiumImg from '../../assets/Image/stadium.png';
import imageSecOne from '../../assets/Image/icon-tickets1.png';
import imageSecTwo from '../../assets/Image/icon-tickets2.png';
import imageSecThree from '../../assets/Image/icon-tickets3.png';
import sectionBlack from '../../assets/Image/Black.png';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getData} from '../../redux/reducers/paymentReducers';

export default function Booking() {
  const eventId = useSelector(state => state.event.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const stadium = Image.resolveAssetSource(stadiumImg).uri;
  const secOne = Image.resolveAssetSource(imageSecOne).uri;
  const secTwo = Image.resolveAssetSource(imageSecTwo).uri;
  const secThree = Image.resolveAssetSource(imageSecThree).uri;
  const SecFour = Image.resolveAssetSource(sectionBlack).uri;

  const [countReg, setCountReg] = useState(0);
  const [countVip, setCountVip] = useState(0);
  const [countVvip, setCountVvip] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [section, setSection] = useState('Reg');
  const [quantity, setQuantity] = useState(0);

  const countRegMinus = () => {
    if (countReg > 0) {
      setCountReg(countReg - 1);
    }
  };

  const countRegPlus = () => {
    setCountReg(countReg + 1);
  };

  const vipCounMin = () => {
    if (countVip > 0) {
      setCountVip(countVip - 1);
    }
  };

  const vipCounPlus = () => {
    setCountVip(countVip + 1);
  };

  const vvipCountMin = () => {
    if (countVvip > 0) {
      setCountVvip(countVvip - 1);
    }
  };

  const vvipCountPlus = () => {
    setCountVvip(countVvip + 1);
  };

  // if (countReg) {
  //   setTotalPrice(countReg * 15);
  // } else if (countVip) {
  //   setTotalPrice(countVip * 35);
  // } else if (countVvip) {
  //   setTotalPrice(countVvip * 50);
  // } else {
  //   setTotalPrice(0);
  // }

  // countReg ? setTotalPrice(countReg * 15) : setTotalPrice(0);
  // countVip ? setTotalPrice(countVip * 35) : setTotalPrice(0);
  // countVvip ? setTotalPrice(countVvip * 50) : setTotalPrice(0);

  useEffect(() => {
    const price = countReg * 15 + countVip * 35 + countVvip * 50;
    setQuantity(countReg + countVip + countVvip);

    countReg && setSection('4');
    countVip && setSection('5');
    countVvip && setSection('6');
    setTotalPrice(price);
  }, [countReg, countVip, countVvip]);

  const handleBuy = () => {
    const form = {
      section: section,
      quantity: quantity,
      price: totalPrice,
    };

    dispatch(getData(form));
    navigation.navigate('Payment');
  };

  return (
    <View>
      <View style={globalStyle.bookingHeader}>
        <TouchableRipple onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="#02A8A8" />
        </TouchableRipple>
        <Text style={globalStyle.textHeader}>Checkout</Text>
      </View>
      <View style={globalStyle.stadiumContainer}>
        <Image
          source={{
            uri: stadium,
          }}
          style={globalStyle.stadiumImg}
        />
      </View>
      <View style={globalStyle.ticketPrice}>
        <Text style={styles.textTicket}>Tickets</Text>
        <View style={globalStyle.byPriceContainer}>
          <Text style={styles.textByPrice}>By Price</Text>
          <AntDesign
            name="swap"
            size={30}
            color="#02A8A8"
            style={globalStyle.swapIcon}
          />
        </View>
      </View>
      <View style={styles.gapVertical}>
        <View style={globalStyle.sectionContainer}>
          <View>
            <Image
              source={{
                uri: secThree,
              }}
              style={styles.sectionIcon}
            />
          </View>
          <View style={globalStyle.sectionName}>
            <Text style={styles.textSection}>Section reg, Row 1</Text>
            <Text style={styles.textAvaible}>12 Seats available</Text>
            <Text style={styles.textSection}>Quantity</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textSection}>$15</Text>
            <Text style={styles.textAvaible}>per person</Text>
            <View style={styles.quantityParent}>
              <TouchableRipple
                onPress={countRegMinus}
                disabled={countVip || countVvip ? true : false}>
                <View style={styles.quantityCount}>
                  <AntDesign name="minus" size={15} />
                </View>
              </TouchableRipple>
              <Text style={styles.textCount}>{countReg}</Text>
              <TouchableRipple
                onPress={countRegPlus}
                disabled={countVip || countVvip ? true : false}>
                <View style={styles.quantityCount}>
                  <AntDesign name="plus" size={15} />
                </View>
              </TouchableRipple>
            </View>
          </View>
          <View />
        </View>
        <View style={globalStyle.sectionContainer}>
          <View>
            <Image
              source={{
                uri: secTwo,
              }}
              style={styles.sectionIcon}
            />
          </View>
          <View style={globalStyle.sectionName}>
            <Text style={styles.textSection}>Section reg, Row 1</Text>
            <Text style={styles.textAvaible}>12 Seats available</Text>
            <Text style={styles.textSection}>Quantity</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textSection}>$35</Text>
            <Text style={styles.textAvaible}>per person</Text>
            <View style={styles.quantityParent}>
              <TouchableRipple
                onPress={vipCounMin}
                disabled={countReg || countVvip ? true : false}>
                <View style={styles.quantityCount}>
                  <AntDesign name="minus" size={15} />
                </View>
              </TouchableRipple>
              <Text style={styles.textCount}>{countVip}</Text>
              <TouchableRipple
                onPress={vipCounPlus}
                disabled={countReg || countVvip ? true : false}>
                <View style={styles.quantityCount}>
                  <AntDesign name="plus" size={15} />
                </View>
              </TouchableRipple>
            </View>
          </View>
          <View />
        </View>
        <View style={globalStyle.sectionContainer}>
          <View>
            <Image
              source={{
                uri: secOne,
              }}
              style={styles.sectionIcon}
            />
          </View>
          <View style={globalStyle.sectionName}>
            <Text style={styles.textSection}>Section reg, Row 1</Text>
            <Text style={styles.textAvaible}>12 Seats available</Text>
            <Text style={styles.textSection}>Quantity</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textSection}>$50</Text>
            <Text style={styles.textAvaible}>per person</Text>
            <View style={styles.quantityParent}>
              <TouchableRipple
                onPress={vvipCountMin}
                disabled={countVip || countReg ? true : false}>
                <View style={styles.quantityCount}>
                  <AntDesign name="minus" size={15} />
                </View>
              </TouchableRipple>
              <Text style={styles.textCount}>{countVvip}</Text>
              <TouchableRipple
                onPress={vvipCountPlus}
                disabled={countVip || countReg ? true : false}>
                <View style={styles.quantityCount}>
                  <AntDesign name="plus" size={15} />
                </View>
              </TouchableRipple>
            </View>
          </View>
          <View />
        </View>
      </View>
      <View style={globalStyle.bookingFooter}>
        <View style={globalStyle.result}>
          <View style={globalStyle.resultLeftSide}>
            <Text style={styles.textCheckSection}>
              {(countReg && 'REG') ||
                (countVip && 'VIP') ||
                (countVvip && 'VVIP')}
            </Text>
            <Octicons name="dot-fill" size={20} />
            <View style={styles.totalTicket}>
              <Image
                source={{
                  uri:
                    countReg || countVip || countVvip
                      ? (countReg && secThree) ||
                        (countVip && secTwo) ||
                        (countVvip && secOne)
                      : SecFour,
                }}
                style={styles.totalTicketIcon}
              />
              <Text>{countReg || countVip || countVvip}</Text>
            </View>
            <Octicons name="dot-fill" size={20} />
            <View style={styles.totalPrice}>
              <Foundation name="dollar" size={20} />
              <Text style={styles.textTotalPrice}>{totalPrice}</Text>
            </View>
          </View>
          <Text style={styles.textAvaible}>Get now on Urticket</Text>
        </View>
        <TouchableRipple style={globalStyle.bookingButton} onPress={handleBuy}>
          <Text style={styles.colorWhite}>Checkout</Text>
        </TouchableRipple>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textTicket: {
    fontSize: 25,
    fontWeight: '600',
  },
  textByPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionIcon: {width: 30, height: 30},
  textSection: {fontSize: 20, fontWeight: '600'},
  textAvaible: {fontSize: 14, color: '#BDC0C4'},
  priceContainer: {alignItems: 'center'},
  totalTicket: {flexDirection: 'row', gap: 5, alignItems: 'center', width: 40},
  totalTicketIcon: {width: 20, height: 20},
  totalPrice: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorWhite: {color: '#fff'},
  gapVertical: {gap: 30, paddingVertical: 10},
  quantityParent: {
    flexDirection: 'row',
    gap: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityCount: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 5,
    padding: 2,
  },
  textCount: {fontSize: 20, width: 15, textAlign: 'center'},
  textCheckSection: {width: 30, textAlign: 'center'},
  textTotalPrice: {minWidth: 20, textAlign: 'center'},
});
