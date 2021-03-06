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

const PasswordField = props => {
  const [securePass, setSecurePass] = useState(true);

  return (
    <View style={AllStyles.loginInputContainer}>
      <Text style={AllStyles.labelStyle}>{props.title}</Text>
      <View style={AllStyles.resetInputRow}>
        {props.svg}
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={colors.fieldtitleColor}
          value={props.value}
          style={AllStyles.textFieldStyle}
          secureTextEntry={securePass}
          onChangeText={props.onChange}
          onBlur={props.onBlur}
        />
        <TouchableOpacity
          style={{marginTop: hp(1)}}
          onPress={() => setSecurePass(!securePass)}>
          {securePass === false ? <EyeOn /> : <EyeOff />}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PasswordField;
