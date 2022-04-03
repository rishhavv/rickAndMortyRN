import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CharacterCard = ({data}) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.cardImageContainer}>
          <Image source={{uri: data?.item?.image}} style={styles.imageStyle} />
        </View>
        <View style={[styles.flexRow, styles.justifySpaceBetween]}>
          <Text style={styles.cardName}>{data.item.name}</Text>
        </View>
        <View style={[styles.flexRow, styles.flexwrap, styles.mt20]}>
          <View
            style={[
              styles.speciesStyle,
              styles.flexRow,
              styles.mr2,
              styles.mb1,
            ]}>
            <Text style={[styles.textLight]}>Species: </Text>
            <Text style={[styles.boldBold]}>{data?.item?.species}</Text>
          </View>
          <View
            style={[
              styles.flexRow,
              styles.mr2,
              styles.mb1,
              styles.flexStart,
              data?.item?.gender === 'Male'
                ? styles.blueGenderStyle
                : data?.item?.gender === 'Female'
                ? styles.pinkGenderStyle
                : styles.unknownStyle,
            ]}>
            <Text style={[styles.textLight]}>Gender: </Text>
            <Text style={[styles.boldBold]}>{data?.item?.gender}</Text>
          </View>
          <View
            style={[
              data.item.status == 'Alive'
                ? styles.greenAlive
                : data.item.status == 'Dead'
                ? styles.redDead
                : styles.unknownStyle,
              styles.mr2,
              styles.mb1,
              styles.flexRow,
            ]}>
            <Text style={styles.textLight}>Status: </Text>
            <Text style={styles.boldBold}>
              {data.item.status === 'unknown' ? 'NA' : data.item.status}
            </Text>
          </View>
          <View
            style={[
              styles.flexRow,
              styles.mb1,
              data?.item?.origin?.name == null
                ? styles.unknownStyle
                : styles.originStyle,
            ]}>
            <Text style={[styles.textLight]}>Origin:{'  '}</Text>
            <Text style={[styles.textLight, styles.bold]}>
              {data?.item?.origin?.name == null
                ? 'unknown'
                : data?.item?.origin?.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('70%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderWidth: 1,
    backgroundColor: '#dbffc7',
  },
  cardImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp('3%'),
  },
  imageStyle: {
    aspectRatio: 2 / 2,
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: hp('1%'),
    color: '#000000',
  },
  textMediumDark: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  mb1: {
    marginBottom: hp('1%'),
  },
  mt20: {
    marginTop: hp('2%'),
  },
  greenText: {
    color: 'green',
    fontSize: 22,
    fontWeight: 'bold',
  },
  redText: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
  },
  justifyContentFlexEnd: {
    justifyContent: 'flex-end',
  },
  speciesStyle: {
    borderRadius: 10,
    backgroundColor: '#d9d943',
    padding: 4,
  },
  flexInBetween: {
    justifyContent: 'space-evenly',
  },
  boldBold: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  unknownStyle: {
    borderRadius: 10,
    backgroundColor: '#c4c4c4',
    padding: 5,
  },
  blueGenderStyle: {
    borderRadius: 10,
    backgroundColor: '#75d1ff',
    padding: 5,
  },
  pinkGenderStyle: {
    borderRadius: 10,
    backgroundColor: '#d687a4',
    padding: 5,
  },
  greenAlive: {
    borderRadius: 10,
    backgroundColor: '#54ff79',
    padding: 5,
  },
  redDead: {
    borderRadius: 10,
    backgroundColor: '#ff5454',
    padding: 5,
  },
  mr2: {
    marginRight: wp('2%'),
  },
  originStyle: {
    borderRadius: 10,
    backgroundColor: '#b072f2',
    padding: 5,
  },
  flexwrap: {
    flexWrap: 'wrap',
  },
});

export default CharacterCard;
