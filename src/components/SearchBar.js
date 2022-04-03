import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useSearchCharacter from '../hooks/useSearchCharacter';
import Header from './Header';
import Modal from 'react-native-modal';
import CharacterPageModal from './characterPageModal/CharacterPageModal';
import CharacterCard from './mainScreen/CharacterCard';

const Search = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [characterData, setCharacterData] = useState();
  // const {HomePosts, errorMessage, HomeLoadingIndicator} = useGetProfile(page);
  const {loading, data, setPage, page, searchInput, setSearchInput} =
    useSearchCharacter();

  const handleClick = data => {
    setCharacterData(data);
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <Header />
      <View style={style.container}>
        <TextInput
          style={style.input}
          placeholder="Search for Characters"
          multiline={false}
          onChangeText={e => setSearchInput(e)}
        />

        <FlatList
          data={data}
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
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    marginTop: hp('1%'),
    width: '95%',
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#5667FF',
    marginRight: 5,
  },
});

export default Search;
