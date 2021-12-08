//=========================================== React Native Import Files =====================================
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

//=========================================== Local Import Files =============================================

import fonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';

const GradientButton = props => {
  return (
    <LinearGradient
      colors={['#6FB3FF', '#7F5AFF']}
      style={styles.gradientStyle}
      start={{y: 0.0, x: 0.0}}
      end={{y: 0.0, x: 1.0}}>
      <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>{props.title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
export default GradientButton;

const styles = StyleSheet.create({
  gradientStyle: {
    borderRadius: wp(7),
    width: '95%',
    // shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    alignSelf: 'center',
    height: hp(6),
    fontFamily: fonts.regular,
    justifyContent: 'center',
  },
  buttonStyle: {
    width: '100%',
    height: hp(6),
    // shadowColor:'#7362B6',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: wp(4.5),
    fontWeight: '800',
    fontFamily: fonts.heavy,
    color: colors.whiteColor,
  },
});
