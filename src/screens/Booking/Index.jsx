import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import globalStyle from '../../assets/globalStyles';
import stadiumImg from '../../assets/Image/stadium.png';
import imageSecOne from '../../assets/Image/icon-tickets1.png';
import imageSecTwo from '../../assets/Image/icon-tickets2.png';
import imageSecThree from '../../assets/Image/icon-tickets3.png';
import sectionBlack from '../../assets/Image/Black.png';

export default function Booking() {
  const stadium = Image.resolveAssetSource(stadiumImg).uri;
  const secOne = Image.resolveAssetSource(imageSecOne).uri;
  const secTwo = Image.resolveAssetSource(imageSecTwo).uri;
  const secThree = Image.resolveAssetSource(imageSecThree).uri;
  const SecFour = Image.resolveAssetSource(sectionBlack).uri;

  return (
    <View>
      <View style={globalStyle.bookingHeader}>
        <AntDesign name="arrowleft" size={30} color="#02A8A8" />
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
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textSection}>$15</Text>
            <Text style={styles.textAvaible}>per person</Text>
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
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textSection}>$15</Text>
            <Text style={styles.textAvaible}>per person</Text>
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
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textSection}>$15</Text>
            <Text style={styles.textAvaible}>per person</Text>
          </View>
          <View />
        </View>
      </View>
      <View style={globalStyle.bookingFooter}>
        <View style={globalStyle.result}>
          <View style={globalStyle.resultLeftSide}>
            <Text>VIP</Text>
            <Octicons name="dot-fill" size={20} />
            <View style={styles.totalTicket}>
              <Image
                source={{
                  uri: SecFour,
                }}
                style={styles.totalTicketIcon}
              />
              <Text>2</Text>
            </View>
            <Octicons name="dot-fill" size={20} />
            <View style={styles.totalPrice}>
              <Foundation name="dollar" size={20} />
              <Text>70</Text>
            </View>
          </View>
          <Text style={styles.textAvaible}>Get now on Urticket</Text>
        </View>
        <Button style={globalStyle.bookingButton}>
          <Text style={styles.colorWhite}>Checkout</Text>
        </Button>
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
  totalTicket: {flexDirection: 'row', gap: 5, alignItems: 'center'},
  totalTicketIcon: {width: 20, height: 20},
  totalPrice: {flexDirection: 'row', gap: 5},
  colorWhite: {color: '#fff'},
  gapVertical: {gap: 30, paddingVertical: 10},
});
