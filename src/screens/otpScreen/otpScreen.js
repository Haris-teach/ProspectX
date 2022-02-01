//==================================== React Native Import Files ==================================
import React from 'react';
import {useState, useRef} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  MaskedViewBase,
} from 'react-native';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import CountDown from 'react-native-countdown-component';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
//==================================== Local Import Files =========================================
import BackArrow from '../../assets/images/backarrow.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AllStyles from '../../all_styles/All_Styles';
import images from '../../assets/images/Images';
import GradientButton from '../../components/gradientButton/Button';
import {
  CODE_NOT_RECEIVED,
  OTP_SUBTITLE,
  OTP_TITLE,
  RESEND,
  SUBMIT,
} from '../../constants/ConstStrings';
import {RESET_PASSWORD} from '../../constants/Navigator';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import HitApi from '../../HitApis/APIHandler';
import {OTPVERIFY, GETOTP} from '../../HitApis/Urls';

const OtpScreen = props => {
  const token = useSelector(state => state.authReducer.token);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const OTPRef = useRef(null);
  const [timer, setTimer] = useState(true);

  const GetOtp = v => {
    setIsLoading(true);
    let params = {
      email: props.route.params.email,
    };
    HitApi(GETOTP, 'post', params, token).then(res => {
      //console.log('Response:   ', res.data);
      if (res.status == 1) {
        Toast.show(res.message, Toast.SHORT, ['UIAlertController']);
      } else {
        Toast.show(res.errors[0], Toast.SHORT, ['UIAlertController']);
      }
      setIsLoading(false);
    });
  };

  const OtpVerify = () => {
    setIsLoading(true);
    let params = {
      email: props.route.params.email,
      otp: otpCode,
    };
    if (otpCode == '') {
      Toast.show('Enter verification code', Toast.SHORT, ['UIAlertController']);
      setIsLoading(false);
    } else {
      HitApi(OTPVERIFY, 'post', params, token).then(res => {
        if (res.status == 1) {
          props.navigation.navigate('ResetScreen', {
            token: res.data.token,
            email: props.route.params.email,
          });
        } else {
          Toast.show(res.errors[0], Toast.SHORT, ['UIAlertController']);
        }
        setIsLoading(false);
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={AllStyles.imageBackground}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ImageBackground
        style={AllStyles.mainContainer}
        source={images.splashBackground}>
        <ScrollView>
          <View style={AllStyles.headerView}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={AllStyles.backArrowWidth}>
              <BackArrow />
            </TouchableOpacity>
          </View>

          <View style={styles.otpMainView}>
            <Text style={styles.otpTitleTextStyle}>
              Enter Verification Code
            </Text>
            <Text style={styles.otpDescTextStyle}>
              Please enter the 4 Digit Verification Code Below
            </Text>
          </View>

          <View style={styles.otpCodeFullView}>
            <OTPInputView
              // ref={OTPRef}
              keyboardType="number-pad"
              style={styles.otpInsideStyle}
              pinCount={4}
              autoFocusOnLoad
              codeInputFieldStyle={styles.otpCodeFieldStyle}
              onCodeFilled={code => {
                // setClearOTP(false);
                console.log(`Code is ${code}, you are good to go!`);
                setOtpCode(code);
              }}
              editable={true}
              //clearInputs={true}
            />
          </View>
          <View style={styles.otpResendViewStyle}>
            {!timer ? (
              <View style={styles.otpResendRowView}>
                <Text style={styles.otpCodeTextStyle}>
                  Did not receive the code yet?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTimer(!timer);
                    GetOtp();
                  }}>
                  <Text style={styles.otpResendTextStyle}>Resend</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <CountDown
                until={60}
                digitStyle={styles.otpDigitStyle}
                digitTxtStyle={styles.otpDigitalTextStyle}
                separatorStyle={styles.otpDigitalTextStyle}
                timeToShow={['M', 'S']}
                timeLabels={{}}
                onFinish={() => setTimer(!timer)}
                size={15}
                showSeparator
              />
            )}
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginTop: hp(15),
              width: wp(80),
              alignSelf: 'center',
            }}>
            <GradientButton
              title={SUBMIT}
              onPress={() => OtpVerify()}
              condition={isLoading}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default OtpScreen;

const styles = StyleSheet.create({
  otpTitleView: {
    height: hp(17),
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpMainView: {
    justifyContent: 'space-between',
    marginHorizontal: wp(10),
    marginTop: hp(6),
  },

  otpTitleTextStyle: {
    fontSize: wp(7.3),
    color: colors.titleColor,
    fontFamily: fonts.regular,
  },

  otpDescTextStyle: {
    fontSize: wp(3.6),
    color: colors.subtitleColor,
    fontFamily: fonts.regular,
    lineHeight: hp(2.2),
    marginVertical: hp(2),
  },

  otpCodeView: {
    height: hp(50),
    justifyContent: 'flex-start',
  },

  otpCodeFullView: {
    height: hp(9),
    //backgroundColor: 'red',
    marginTop: hp(3),
    marginHorizontal: wp(10),
  },

  otpInsideStyle: {},

  otpCodeFieldStyle: {
    backgroundColor: 'white',
    borderRadius: wp(6),
    height: hp(10),
    width: wp(18),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    color: 'black',
    elevation: 5,
  },

  otpResendViewStyle: {
    marginVertical: hp(5),
    marginHorizontal: wp(6),
  },
  otpResendRowView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  otpCodeTextStyle: {
    textAlignVertical: 'bottom',
    textAlign: 'center',
    color: 'black',
    fontSize: wp(3.5),
    fontFamily: fonts.regular,
  },

  otpResendTextStyle: {
    fontFamily: fonts.semiBold,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp(0.9),
  },
  otpDigitStyle: {
    backgroundColor: 'transparent',
  },
  otpDigitalTextStyle: {
    color: '#A3A3A3',
  },
});
