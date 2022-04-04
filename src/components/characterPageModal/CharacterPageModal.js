//Character Page modal - Opens when you click on a card from homescreen
//Episode and Origin Detains

import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import Header from '../Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useEpisodeHook from '../../hooks/useEpisodeHook';
import useLocationHook from '../../hooks/useLocationHook';

const CharacterPageModal = data => {
  const {loading, episodes, setQuery} = useEpisodeHook(); //Get Episode details hook

  // Get Character's origin information
  const {location} = useLocationHook(
    data?.data?.origin?.url.split('/')[
      data?.data?.origin?.url.split('/').length - 1
    ],
  );

  //Sets useEpisodeHook API call parameters
  useEffect(() => {
    const querySetter = async () => {
      const temp = await data.data.episode.map((itr, index) => {
        return Number(itr.split('/')[itr.split('/').length - 1]);
      });
      setQuery(temp);
    };
    querySetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // return Modal View
  return (
    <View>
      <Header />

      <View style={styles.container}>
        <View style={styles.cardImageContainer}>
          <Image source={{uri: data?.data?.image}} style={styles.imageStyle} />
          <View style={[styles.ml2]}>
            <Text style={styles.cardName}>{data?.data?.name}</Text>
            <View>
              <Text style={[styles.blacktext]}>Origin</Text>
              <Text style={[styles.bold]}>
                {location ? location.name : 'unknown'}
              </Text>
            </View>
            <View>
              <Text style={[styles.blacktext]}>Dimentions </Text>
              <Text style={[styles.bold]}>
                {location ? location.dimension : 'NA'}
              </Text>
            </View>
            <View style={[styles.flexRow, styles.justifySpaceBetween]}>
              <View>
                <Text style={[styles.blacktext]}>Type </Text>
                <Text style={[styles.bold]}>
                  {location ? location.type : 'NA'}
                </Text>
              </View>
              <View>
                <Text style={[styles.blacktext]}>Residents </Text>
                <Text style={[styles.bold]}>
                  {location ? location?.residents?.length : 'NA'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mt20}>
          <Text style={styles.cardName}>
            Featured in {data?.data?.episode?.length}
            {data?.data?.episode?.length > 1 ? ' episodes!' : ' episode'}{' '}
          </Text>
        </View>
        <View style={styles.flatList}>
          <FlatList
            data={episodes}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentInset={{
              left: 0,
              top: 30,
              right: 0,
              bottom: 30,
            }}
            renderItem={item => {
              return (
                <View style={[styles.episodeContainer]}>
                  <View style={[styles.flexRow, styles.justifySpaceBetween]}>
                    <Text style={[styles.textLight]}>{item?.item?.name}</Text>
                    <Text style={[styles.textLight]}>
                      {item?.item?.air_date}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.flexRow,
                      styles.justifySpaceBetween,
                      styles.textLight,
                    ]}>
                    {item.item.episode}
                  </Text>
                </View>
              );
            }}
            _keyExtractor={(item, index) => {
              item.episode;
            }}
          />
        </View>
      </View>
    </View>
  );
};

//stylesheet

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
    fontSize: 25,
    marginBottom: hp('1%'),
    color: '#000000',
  },
  textLight: {
    color: '#000000',
    fontSize: 15,
  },
  textWhite: {
    color: 'white',
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

  justifyContentFlexEnd: {
    justifyContent: 'flex-end',
  },

  flexInBetween: {
    justifyContent: 'space-evenly',
  },
  boldBold: {
    color: '#000000',
    fontSize: 13,
    fontWeight: 'bold',
  },
  ml2: {
    marginLeft: wp('2%'),
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
  blacktext: {
    color: 'black',
  },
});

export default CharacterPageModal;
