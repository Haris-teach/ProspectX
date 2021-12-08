//========================================= React Native Import Files ============================

import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AllStyles from '../../all_styles/All_Styles';

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
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={AllStyles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ImageBackground
          source={images.splashBackground}
          style={AllStyles.mainContainer}>
          <ScrollView
            style={AllStyles.mainContainer}
            showsVerticalScrollIndicator={false}>
            <View style={{height: heightPercentageToDP(15)}}>
              <AppHeader
                leftIconBackgrounColor={colors.whiteColor}
                leftSvg={<BackArrow height={15} width={15} />}
                title={CHANGE_PASS_TITLE}
                leftIconPress={() => props.navigation.goBack(null)}
              />
            </View>

            <View style={AllStyles.changepasswordMainView}>
              <View style={AllStyles.changePasswordHeadingView}>
                <Text style={AllStyles.changePasswordDecStyle}>
                  {CHANGE_PASS_DESC}
                </Text>
              </View>
              <View style={AllStyles.changePasswordComponentView}>
                <ChangePasswordComponent
                  placeholder={OLD_PASSWORD}
                  value={oldPassword}
                  onChange={oldPassword => setOldPassword(oldPassword)}
                />
                <ChangePasswordComponent
                  placeholder={NEW_PASSWORD}
                  value={newPassword}
                  onChange={newPassword => setNewPassword(newPassword)}
                />
                <ChangePasswordComponent
                  placeholder={CONFIRM_PASSWORD}
                  value={confirmPassword}
                  onChange={confirmPassword =>
                    setConfirmPassword(confirmPassword)
                  }
                />
              </View>
              <View style={AllStyles.changePasswordBottomView}>
                <View style={AllStyles.changePasswordButtonView}>
                  <GradientButton
                    onPress={() => alert('Login Pressed')}
                    title={'Save'}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;
