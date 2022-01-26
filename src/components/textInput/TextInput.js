//========================================= React Native Import Files =================================

import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//========================================= Local Import Files =======================================

import AllStyles from '../../all_styles/All_Styles';
import colors from '../../assets/colors/Colors';

const TextField = props => {
  return (
    // <View style={AllStyles.loginInputContainer}>
    //   <Text style={AllStyles.labelStyle}>{props.title}</Text>
    //   <View style={AllStyles.inputRow}>
    //     {props.svg}
    //     <TextInput
    //       placeholder={props.placeholder}
    //       placeholderTextColor={colors.fieldtitleColor}
    //       value={props.value}
    //       style={AllStyles.textFieldStyle}
    //       keyboardType={'email-address'}
    //       onChangeText={props.onChange}
    //     />
    //   </View>
    // </View>
    <View style={AllStyles.loginInputContainer}>
      <Text style={AllStyles.labelStyle}>{props.title}</Text>
      <View style={AllStyles.inputRow}>
        {props.svg}
        <TextInput
          autoCapitalize="none"
          placeholder={props.placeholder}
          placeholderTextColor={colors.fieldtitleColor}
          value={props.value}
          style={AllStyles.textFieldStyle}
          keyboardType={'email-address'}
          onChangeText={props.onChange}
          onBlur={props.onBlur}
        />
      </View>
    </View>
  );
};
export default TextField;
