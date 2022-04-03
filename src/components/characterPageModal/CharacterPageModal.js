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
  const [originData, setOriginData] = useState();

  return (
    <View>
      <Header />

      <ScrollView style={styles.container}>
        <View style={styles.cardImageContainer}>
          <Image source={{uri: data?.data?.image}} style={styles.imageStyle} />
        </View>
        <View style={[styles.flexRow, styles.flexjustifyCenter]}>
          <Text style={styles.cardName}>{data.data.name}</Text>
        </View>
        <View style={[styles.flexRow, styles.flexwrap]}>
          <View
            style={[
              styles.speciesStyle,
              styles.flexRow,
              styles.mr2,
              styles.mb1,
            ]}>
            <Text style={[styles.textLight]}>Species: </Text>
            <Text style={[styles.boldBold]}>{data?.data?.species}</Text>
          </View>
          <View
            style={[
              styles.flexRow,
              styles.mr2,
              styles.mb1,
              styles.flexStart,
              data?.data?.gender === 'Male'
                ? styles.blueGenderStyle
                : data?.data?.gender === 'Female'
                ? styles.pinkGenderStyle
                : styles.unknownStyle,
            ]}>
            <Text style={[styles.textLight]}>Gender: </Text>
            <Text style={[styles.boldBold]}>{data?.data?.gender}</Text>
          </View>
          <View
            style={[
              data.data.status == 'Alive'
                ? styles.greenAlive
                : data.data.status == 'Dead'
                ? styles.redDead
                : styles.unknownStyle,
              styles.mr2,
              styles.mb1,
              styles.flexRow,
            ]}>
            <Text style={styles.textLight}>Status: </Text>
            <Text style={styles.boldBold}>
              {data.data.status === 'unknown' ? 'NA' : data.data.status}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.flexRow,
            styles.mb1,
            data?.data?.origin.name === 'unknown'
              ? styles.unknownStyle
              : styles.originStyle,
          ]}>
          <Text style={[styles.textLight]}>Origin:{'  '}</Text>
          <Text style={[styles.textLight, styles.bold]}>
            {data?.data?.origin?.name}
          </Text>
        </View>
        <View style={styles.mt20}>
          <Text style={styles.cardName}>
            Featured in {data?.data?.episode?.length} episodes!
          </Text>
        </View>
        <View>
          <FlatList
            data={data?.data?.episode}
            nestedScrollEnabled={true}
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
                  <Text>
                    {data.item.split('/')[data.item.split('/').length - 1]}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              item.id;
            }}
          />
        </View>
      </ScrollView>
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
  flexjustifyCenter: {
    justifyContent: 'center',
  },
  episodeContainer: {
    borderWidth: 1,
    marginBottom: hp('1%'),
    padding: 7,
  },
});

export default CharacterPageModal;
