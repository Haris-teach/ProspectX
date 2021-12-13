//========================================= React Native Import Files ============================

import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AllStyles from '../../all_styles/All_Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//======================================== Local Import Files ====================================
import images from '../../assets/images/Images';

import colors from '../../assets/colors/Colors';
import BackArrow from '../../assets/images/backarrow.svg';

const ChatScreen = props => {
  return (
    <KeyboardAvoidingView style={AllStyles.mainContainer} behavior={'padding'}>
      <ImageBackground
        source={images.splashBackground}
        style={AllStyles.mainContainer}>
        {/* Header Code */}

        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.backButton}>
            <BackArrow height={15} width={15} />
          </TouchableOpacity>
          {/* <Text style={styles.headerText}>Change Password</Text> */}
        </View>
        {/* -------------------------------------------------------------------------- */}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = {
  headerContainer: {
    height: hp(15),
    alignItems: 'center',
    flexDirection: 'row',
  },

  backButton: {
    backgroundColor: colors.whiteColor,
    height: hp(3.5),
    width: wp(7.7),
    marginLeft: wp(6),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0E2247',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  headerText: {
    flex: 1,
    color: colors.titleColor,
    fontSize: wp(5.5),
    fontFamily: 'SF Pro Text',
    textAlign: 'center',
    marginRight: wp(10),
  },
  textStyle: {
    fontSize: wp(4.3),
    color: colors.titleColor,
    marginVertical: hp(6),
    // backgroundColor: 'red',
    marginHorizontal: wp(12),
  },
};
