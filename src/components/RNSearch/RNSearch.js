import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Calendar from '../../assets/svg/calendar.svg';

const RNSearch = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="#AAB1BC"
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity onPress={props.onPress} style={styles.iconStyle}>
        <Calendar alignSelf="center" />
      </TouchableOpacity>
    </View>
  );
};

export default RNSearch;

const styles = {
  mainContainer: {
    marginHorizontal: wp(6),
    flexDirection: 'row',
  },
  textInputContainer: {
    width: wp(74),
    height: hp(6),
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: wp(10),
    color: 'black',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: wp(5),
    fontSize: wp(4.2),
  },
  iconStyle: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: hp(6),
    height: hp(6),
    marginLeft: wp(2),
    justifyContent: 'center',
    borderRadius: hp(6),
  },
};
