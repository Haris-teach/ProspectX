//======================================= React Native Import Files ==============================
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//======================================= Local Import Files ======================================
import AllStyles from '../../all_styles/All_Styles';
const AppHeader = props => {
  return (
    <View style={AllStyles.appHeaderMainView}>
      <TouchableOpacity
        onPress={props.leftIconPress}
        style={{
          backgroundColor: props.leftIconBackgrounColor,
          height: hp(3.2),
          width: wp(7),
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: wp(2),
          justifyContent: 'center',
          shadowColor: '#0E2247',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 8,
        }}>
        {props.leftSvg}
      </TouchableOpacity>
      <Text style={AllStyles.appHeaderTitleStyle}>{props.title}</Text>
      {props.rightSvg ? (
        <TouchableOpacity
          onPress={props.rightIconPress}
          style={{
            backgroundColor: props.rightIconBackgrounColor,
            height: hp(3.2),
            width: wp(7),
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: wp(2),
            justifyContent: 'center',
            shadowColor: '#0E2247',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 8,
          }}>
          {props.rightSvg}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default AppHeader;
