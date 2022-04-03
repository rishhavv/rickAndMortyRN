import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Header from '../Header';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Modal from 'react-native-modal';
import useCharacterAPI from '../../hooks/useCharaterAPI';
import CharacterCard from './CharacterCard';
import CharacterPageModal from '../characterPageModal/CharacterPageModal';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [characterData, setCharacterData] = useState();
  // const {HomePosts, errorMessage, HomeLoadingIndicator} = useGetProfile(page);
  const {loading, data, setPage, page} = useCharacterAPI();

  const renderActivityIndicator = () => {
    return (
      <View style={style.actIndicator}>
        <ActivityIndicator size={50} color="#5667FF" />
      </View>
    );
  };
  const handleClick = data => {
    setCharacterData(data);
    setModalVisible(!modalVisible);
  };

  const renderCards = () => {
    return (
      <View style={style.container}>
        <FlatList
          data={data}
          decelerationRate={'fast'}
          snapToInterval={hp('70%') + hp('3%')}
          snapToAlignment={'center'}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={4}
          onEndReached={() => setPage(page + 1)}
          contentInset={{
            left: 0,
            top: 30,
            right: 0,
            bottom: 30,
          }}
          renderItem={data => {
            return (
              <View style={style.card}>
                <TouchableHighlight onPress={() => handleClick(data.item)}>
                  <CharacterCard data={data} />
                </TouchableHighlight>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            item.id;
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          backdropOpacity={0.52}
          visible={modalVisible}
          style={style.Modal}
          onBackButtonPress={() => setModalVisible(false)}>
          <View
            style={[style.ModalContainer, style.justifyContentspaceBetween]}>
            <CharacterPageModal data={characterData} />
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View>
      <StatusBar animated={true} backgroundColor="#78a660" hidden={false} />
      <Header />
      {loading ? renderActivityIndicator() : renderCards()}
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    paddingHorizontal: wp('5%'),
    marginBottom: hp('3%'),
  },
  container: {
    backgroundColor: '#78a660',
    marginBottom: hp('14%'),
  },
  actIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('40%'),
  },
  Modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  ModalContainer: {
    backgroundColor: '#fff',
    elevation: 5,
    width: '100%',
    height: hp('98%'),
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  justifyContentspaceBetween: {
    justifyContent: 'space-between',
  },
  buyHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  fontMidSize: {
    fontSize: 20,
  },
  buyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp('1.5%'),
    borderRadius: 8,
    backgroundColor: '#5667FF',
  },
  textWhite: {
    color: 'white',
  },
  indecbutton: {
    backgroundColor: '#e3e3e3',
    padding: 10,
    borderRadius: 8,
  },
  flexGrow1: {
    flexGrow: 1,
    alignItems: 'center',
  },
  alignCenter: {
    alignSelf: 'center',
  },
  mx2p: {
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
});

export default HomeScreen;
