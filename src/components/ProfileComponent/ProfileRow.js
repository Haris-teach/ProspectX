//==================================== React Native Import Files ====================================
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//=================================== Local Import Files ===================================
import AllStyles from '../../all_styles/All_Styles';
import ForwardArrow from '../../assets/images/forwardarrow.svg';

const ProfileComponent = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={AllStyles.profileComponentMainView}>
      <View
        style={{
          height: hp(3.5),
          width: hp(3.5),
          backgroundColor: props.backgroundColor,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: hp(3.5),
        }}>
        {props.svg}
      </View>
      <View style={AllStyles.profileComponentRowStyle}>
        <Text style={AllStyles.profileComponentTitleStyle}>{props.title}</Text>
        <ForwardArrow height={15} width={15} />
      </View>
    </TouchableOpacity>
  );
};
export default ProfileComponent;
