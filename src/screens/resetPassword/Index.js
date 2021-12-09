//==================================== React Native Import Files ==========================
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//=================================== Local Import Files
import AllStyles from '../../all_styles/All_Styles';
import BackArrow from '../../assets/images/backarrow.svg';
import images from '../../assets/images/Images';
import {
  RESET_PASSWORD_TITLE,
  RESET_PASSWORD_SUBTEXT,
  ENTER_PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  ENTER_CONFIRM_PASSWORD_LABEL,
  RESET_BUTTON_TEXT,
} from '../../constants/ConstStrings';
import PasswordField from '../../components/PasswordInput/PasswordInput';
import Lock from '../../assets/images/lock.svg';
import GradientButton from '../../components/gradientButton/Button';
import IncomingCalls from '../incomingCallScreen/Index';
import {INCOMING_CALLS} from '../../constants/Navigator';
const ResetPassword = props => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewpassword] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.splashBackground}
        style={AllStyles.mainContainer}>
        <View style={{flex: 1}}>
          <View style={AllStyles.headerView}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack(null)}
              style={AllStyles.backArrowWidth}>
              <BackArrow />
            </TouchableOpacity>
          </View>

          <Text style={AllStyles.signinStyle}>{RESET_PASSWORD_TITLE}</Text>
          <Text style={AllStyles.enterEmailStyle}>
            {RESET_PASSWORD_SUBTEXT}
          </Text>

          <View style={{marginHorizontal: wp(3), marginTop: hp(3)}}>
            <PasswordField
              onChange={newPassword => setNewPassword(newPassword)}
              title={ENTER_PASSWORD_LABEL}
              placeholder={PASSWORD_PLACEHOLDER}
              value={newPassword}
              svg={<Lock marginVertical={hp(2)} />}
            />
          </View>

          <View style={{marginHorizontal: wp(3), marginVertical: hp(2)}}>
            <PasswordField
              onChange={confirmNewPassword =>
                setConfirmNewpassword(confirmNewPassword)
              }
              title={ENTER_CONFIRM_PASSWORD_LABEL}
              placeholder={PASSWORD_PLACEHOLDER}
              value={confirmNewPassword}
              svg={<Lock marginVertical={hp(2)} />}
            />
          </View>
        </View>
        <View style={AllStyles.resetGradientView}>
          <GradientButton
            onPress={() => props.navigation.navigate('LoginScreen')}
            title={RESET_BUTTON_TEXT}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ResetPassword;
