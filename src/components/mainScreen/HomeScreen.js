//HomeScreen

import React, {useState} from 'react';
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import Header from '../Header';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; //for responsive UI

import Modal from 'react-native-modal';
import useCharacterAPI from '../../hooks/useCharaterAPI';
import CharacterCard from './CharacterCard';
import CharacterPageModal from '../characterPageModal/CharacterPageModal';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [characterData, setCharacterData] = useState();
  const {loading, data, setPage, page} = useCharacterAPI(); //fetch characters custom hook

  //activity Indicator
  const renderActivityIndicator = () => {
    return (
      <View style={style.actIndicator}>
        <ActivityIndicator size={50} color="#78a660" />
      </View>
    );
  };

  //Handle Tap on the characterCard

  const handleTap = d => {
    setCharacterData(d);
    setModalVisible(!modalVisible);
  };

  //render list of characters
  const renderCards = () => {
    return (
      <View style={style.container}>
        <FlatList
          data={data}
          decelerationRate={'fast'}
          snapToInterval={hp('70%') + hp('3%')}
          snapToAlignment={'center'}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={8}
          onEndReached={() => setPage(page + 1)}
          contentInset={{
            left: 0,
            top: 30,
            right: 0,
            bottom: 30,
          }}
          renderItem={ele => {
            return (
              <View style={style.card}>
                <TouchableHighlight onPress={() => handleTap(ele.item)}>
                  <CharacterCard data={ele} />
                </TouchableHighlight>
              </View>
            );
          }}
          _keyExtractor={(item, index) => {
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

  //homescreen return

  return (
    <View>
      <StatusBar animated={true} backgroundColor="#78a660" hidden={false} />
      <Header />
      {loading ? renderActivityIndicator() : renderCards()}
    </View>
  );
};

//stylesheet

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

  justifyContentspaceBetween: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
