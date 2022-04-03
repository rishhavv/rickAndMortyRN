import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import Header from '../Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../../api/axiosConfig';

const CharacterPageModal = data => {
  return (
    <View>
      <Header />

      <View style={styles.container}>
        <View style={styles.cardImageContainer}>
          <Image source={{uri: data?.data?.image}} style={styles.imageStyle} />
          <View style={[styles.ml2]}>
            <Text style={styles.cardName}>{data?.data?.name}</Text>
            <View>
              <Text>Origin</Text>
              <Text style={[styles.bold]}>{data?.data?.origin?.name}</Text>
            </View>
            <View>
              <Text>Dimentions </Text>
              <Text style={[styles.bold]}>{data?.data?.origin?.dimension}</Text>
            </View>
            <View style={[styles.flexRow, styles.justifySpaceBetween]}>
              <View>
                <Text>Type </Text>
                <Text style={[styles.bold]}>{data?.data?.origin?.type}</Text>
              </View>
              <View>
                <Text>Residents </Text>
                <Text style={[styles.bold]}>
                  {data?.data?.origin?.residents?.length}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mt20}>
          <Text style={styles.cardName}>
            Featured in {data?.data?.episode?.length} episodes!
          </Text>
        </View>
        <View style={styles.flatList}>
          <FlatList
            data={data?.data?.episode}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentInset={{
              left: 0,
              top: 30,
              right: 0,
              bottom: 30,
            }}
            renderItem={data => {
              return (
                <View style={[styles.episodeContainer]}>
                  <View style={[styles.flexRow, styles.justifySpaceBetween]}>
                    <Text style={[styles.textLight]}>{data?.item?.name}</Text>
                    <Text style={[styles.textLight]}>
                      {data?.item?.air_date}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.flexRow,
                      styles.justifySpaceBetween,
                      styles.textLight,
                    ]}>
                    {data.item.episode}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              item.episode;
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderWidth: 1,
    backgroundColor: '#dbffc7',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: hp('70%'),
    borderRadius: 30,
  },
  cardImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: wp('3%'),
  },
  imageStyle: {
    aspectRatio: 2 / 2,
    width: '40%',
  },
  bold: {
    fontWeight: 'bold',
    color: 'black',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: hp('1%'),
    color: '#000000',
  },
  textLight: {
    color: '#000000',
    fontSize: 13,
  },
  textWhite: {
    color: 'white',
  },
  textMediumDark: {
    fontSize: 15,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  redText: {
    color: 'red',
    fontSize: 20,
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
    fontSize: 13,
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
  ml2: {
    marginLeft: wp('2%'),
  },
  originStyle: {
    borderRadius: 10,
    backgroundColor: '#b072f2',
    padding: 5,
  },
  flexwrap: {
    flexWrap: 'wrap',
  },
  flexjustifyCenter: {
    justifyContent: 'center',
  },
  episodeContainer: {
    borderWidth: 1,
    marginBottom: hp('1%'),
    padding: 10,
    backgroundColor: 'white',
  },
  flatList: {
    marginBottom: 400,
    height: hp('55%'),
  },
});

export default CharacterPageModal;
