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
    // <View style={styles.changePasswordComponentMainView}>
    //   <TextInput
    //     placeholder={props.placeholder}
    //     placeholderTextColor={colors.fieldtitleColor}
    //     value={props.value}
    //     style={styles.changePassTextFieldStyle}
    //     secureTextEntry={securePass}
    //     onChangeText={props.onChange}
    //   />
    //   <TouchableOpacity
    //     onPress={() => setSecurePass(!securePass)}
    //     style={styles.iconStyle}>
    //     {securePass === false && props.svg == true ? (
    //       <EyeOn />
    //     ) : securePass === true && props.svg == true ? (
    //       <EyeOff />
    //     ) : null}
    //   </TouchableOpacity>
    // </View>

    <View style={styles.changePasswordComponentMainView}>
      <TextInput
        style={styles.changePassTextFieldStyle}
        placeholder={props.placeholder}
        maxLength={20}
        secureTextEntry={securePass}
        onChangeText={props.onChange}
      />
      <TouchableOpacity
        onPress={() => setSecurePass(!securePass)}
        style={styles.iconStyle}>
        {securePass === false && props.svg == true ? (
          <EyeOn alignSelf="center" />
        ) : securePass === true && props.svg == true ? (
          <EyeOff alignSelf="center" />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
export default ChangePassword;

const styles = {
  changePasswordComponentMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(8),
    backgroundColor: colors.profileRowBackgroundColor,
    height: hp(7),
    borderColor: colors.whiteColor,
    borderWidth: 1,
    borderRadius: wp(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: hp(2),
    alignItems: 'center',
  },
  changePassTextFieldStyle: {
    //backgroundColor: 'red',
    width: wp(68),
    height: hp(6),
    marginLeft: wp(4),
  },
  iconStyle: {
    //backgroundColor: 'red',
    marginRight: wp(4),
    width: wp(10),
    alignSelf: 'center',
    height: hp(5),
    justifyContent: 'center',
  },
};
