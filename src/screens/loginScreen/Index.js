//========================================== React Native Import Files ===========================

import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

//========================================== Local Import Files ===================================
import images from '../../assets/images/Images';
import styles from './Style';
import LoginImage from '../../assets/images/loginImage.svg';
import User from '../../assets/images/user.svg';
import Lock from '../../assets/images/lock.svg';
import GradientButton from '../../components/gradientButton/Button';
import {Login} from '../../redux/Actions/authActions';
import {
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  ENTER_EMAIL_PASSWORD,
  FORGOT_PASSWORD_LABEL,
  LOGIN_BUTTON_TITTLE,
  PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  SIGN_IN,
} from '../../constants/ConstStrings';
import {FORGOT_PASSWORD} from '../../constants/Navigator';
import TextField from '../../components/textInput/TextInput';
import PasswordField from '../../components/PasswordInput/PasswordInput';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePass, setSecurePass] = useState(true);
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ImageBackground
          style={styles.imageBackground}
          source={images.splashBackground}>
          <ScrollView style={styles.imageBackground}>
            <View style={styles.logoStyle}>
              <LoginImage />
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.firstColumn}>
                <Text style={styles.signinStyle}>{SIGN_IN}</Text>
                <Text style={styles.enterEmailStyle}>
                  {ENTER_EMAIL_PASSWORD}
                </Text>
              </View>

              <View style={{marginTop: hp(-2)}}>
                <TextField
                  onChange={email => setEmail(email)}
                  title={EMAIL_LABEL}
                  placeholder={EMAIL_PLACEHOLDER}
                  value={email}
                  svg={<User marginVertical={hp(2)} />}
                />
              </View>
              <View style={{marginTop: hp(2)}}>
                <PasswordField
                  onChange={password => setPassword(password)}
                  title={PASSWORD_LABEL}
                  placeholder={PASSWORD_PLACEHOLDER}
                  value={password}
                  svg={<Lock marginVertical={hp(2)} />}
                />
              </View>

              <View style={styles.gradientView}>
                <GradientButton
                  onPress={() => dispatch(Login(null))}
                  title={LOGIN_BUTTON_TITTLE}
                />
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ForgotScreen')}
                style={styles.forgotView}>
                <Text style={styles.forgotStyle}>{FORGOT_PASSWORD_LABEL}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default LoginScreen;
