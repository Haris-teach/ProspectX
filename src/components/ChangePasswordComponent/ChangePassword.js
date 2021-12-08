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
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useState} from 'react';
//========================================= Local Import Files =======================================

import AllStyles from '../../all_styles/All_Styles';
import colors from '../../assets/colors/Colors';
import EyeOn from '../../assets/images/eye.svg';
import EyeOff from '../../assets/images/eyeoff.svg';

const ChangePassword = props => {
  const [securePass, setSecurePass] = useState(true);

  return (
    <View style={AllStyles.changePasswordComponentMainView}>
      <View style={AllStyles.resetInputRow}>
        {props.svg}
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={colors.fieldtitleColor}
          value={props.value}
          style={AllStyles.changePassTextFieldStyle}
          secureTextEntry={securePass}
          onChangeText={props.onChange}
        />
        <TouchableOpacity onPress={() => setSecurePass(!securePass)}>
          {securePass === false ? <EyeOn /> : <EyeOff />}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChangePassword;
