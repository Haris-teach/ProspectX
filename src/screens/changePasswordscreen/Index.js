//========================================= React Native Import Files ============================

import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AllStyles from '../../all_styles/All_Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//======================================== Local Import Files ====================================
import images from '../../assets/images/Images';
import AppHeader from '../../components/AppHeadercomponent/Appheader';
import colors from '../../assets/colors/Colors';
import BackArrow from '../../assets/images/backarrow.svg';
import ChangePasswordComponent from '../../components/ChangePasswordComponent/ChangePassword';
import GradientButton from '../../components/gradientButton/Button';
import {
  CHANGE_PASS_TITLE,
  CONFIRM_PASSWORD,
  NEW_PASSWORD,
  OLD_PASSWORD,
  CHANGE_PASS_DESC,
} from '../../constants/ConstStrings';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
const ChangePassword = props => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <KeyboardAvoidingView
      style={AllStyles.mainContainer}
      behavior={Platform.OS == 'ios' ? 'padding' : null}>
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
          <Text style={styles.headerText}>Change Password</Text>
        </View>
        {/* -------------------------------------------------------------------------- */}
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Text style={styles.textStyle}>{CHANGE_PASS_DESC}</Text>

          <ChangePasswordComponent
            placeholder={OLD_PASSWORD}
            value={oldPassword}
            onChange={oldPassword => setOldPassword(oldPassword)}
            //svg={true}
          />

          <ChangePasswordComponent
            placeholder={NEW_PASSWORD}
            value={newPassword}
            onChange={Password => setNewPassword(Password)}
            svg={true}
          />

          <ChangePasswordComponent
            placeholder={CONFIRM_PASSWORD}
            value={confirmPassword}
            onChange={Password => setConfirmPassword(Password)}
            svg={true}
          />

          <View
            style={{
              height: hp(25),
              marginBottom: hp(10),
              alignSelf: 'center',
              width: wp(80),
              justifyContent: 'flex-end',
            }}>
            <GradientButton
              onPress={() => alert('Login Pressed')}
              title={'Save'}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

const styles = {
  headerContainer: {
    height: hp(15),
    alignItems: 'center',
    flexDirection: 'row',
  },

  backButton: {
    backgroundColor: colors.whiteColor,
    height: hp(4),
    width: wp(7),
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
