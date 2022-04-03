import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageName}>Rick And Morty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('8%'),
    alignItems: 'center',
    padding: hp('1%'),
    backgroundColor: '#78a660',
  },
  pageName: {
    flexGrow: 1,
    textAlign: 'center',
    marginRight: wp('10%'),
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});

export default Header;
