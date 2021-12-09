//========================================= React Native Import Files =================================

import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
//========================================= Local Import Files =======================================

import AllStyles from '../../all_styles/All_Styles';
import colors from '../../assets/colors/Colors';
import EyeOn from '../../assets/images/eye.svg';
import EyeOff from '../../assets/images/eyeoff.svg';
import fonts from '../../assets/fonts/Fonts';

const ChangePassword = props => {
  const [securePass, setSecurePass] = useState(true);

  return (
    <View style={styles.changePasswordComponentMainView}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={colors.fieldtitleColor}
        value={props.value}
        style={styles.changePassTextFieldStyle}
        secureTextEntry={securePass}
        onChangeText={props.onChange}
      />
      <TouchableOpacity
        onPress={() => setSecurePass(!securePass)}
        style={styles.iconStyle}>
        {securePass === false && props.svg == true ? (
          <EyeOn />
        ) : securePass === true && props.svg == true ? (
          <EyeOff />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
export default ChangePassword;

const styles = {
  changePasswordComponentMainView: {
    backgroundColor: colors.profileRowBackgroundColor,
    shadowColor: '#7362B6',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    width: wp(80),
    alignSelf: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    height: hp(7),
    borderColor: colors.whiteColor,
    borderWidth: 1,
    borderRadius: wp(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: hp(2),
  },
  changePassTextFieldStyle: {
    fontSize: wp(4),
    marginLeft: wp(3),
    fontFamily: fonts.medium,
    // backgroundColor: 'red',
    width: wp(65),
    color: 'black',
  },
  iconStyle: {alignSelf: 'center', marginRight: wp(3)},
};
