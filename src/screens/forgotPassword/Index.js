//=========================================== React Native Import Files ========================
import React from 'react';
import {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import images from '../../assets/images/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//=========================================== Local Import Files ================================
import styles from './Style';
import BackArrow from '../../assets/images/backarrow.svg';
import {
  DESC_TEXT,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  FORGOT_PASSWORD_TITLE,
  RESEND_CODE,
  SUBMIT,
} from '../../constants/ConstStrings';
import User from '../../assets/images/user.svg';
import TextField from '../../components/textInput/TextInput';
import GradientButton from '../../components/gradientButton/Button';
import {RESET_PASSWORD} from '../../constants/Navigator';
import AllStyles from '../../all_styles/All_Styles';
const ForgotPassword = props => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.mainContainer}>
        <ImageBackground
          source={images.splashBackground}
          style={styles.mainContainer}>
          {/* <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}> */}
          <View style={{flex: 1}}>
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack(null)}
                style={styles.backArrowWidth}>
                <BackArrow />
              </TouchableOpacity>
            </View>

            <Text style={styles.titleTextStyle}>{FORGOT_PASSWORD_TITLE}</Text>

            <Text style={styles.descTextStyle}>{DESC_TEXT}</Text>
            <View style={{marginHorizontal: wp(3)}}>
              <TextField
                onChange={email => setEmail(email)}
                title={EMAIL_LABEL}
                placeholder={EMAIL_PLACEHOLDER}
                value={email}
                svg={<User marginVertical={hp(2)} />}
              />
            </View>
            <View style={styles.bottomView}>
              <View style={AllStyles.forgotGradientView}>
                <GradientButton
                  title={SUBMIT}
                  onPress={() => props.navigation.navigate(RESET_PASSWORD)}
                />
              </View>

              <TouchableOpacity
                onPress={() =>
                  alert('New Code has been sent to your given email')
                }>
                <Text style={styles.resendCodeStyle}>{RESEND_CODE}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </ScrollView> */}
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ForgotPassword;
