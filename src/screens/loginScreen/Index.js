//========================================== React Native Import Files ===========================
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';

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

import TextField from '../../components/textInput/TextInput';
import PasswordField from '../../components/PasswordInput/PasswordInput';

import HitApi from '../../HitApis/APIHandler';
import {LOGIN} from '../../HitApis/Urls';

const LoginScreen = props => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //============= Funtion for Login USer ======================

  const Login_User = async v => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    setLoading(true);
    let params = {
      email: v.email,
      password: v.password,
      fcm_token: fcmToken,
    };

    HitApi(LOGIN, 'POST', params).then(async res => {
      if (res.status == 1) {
        setError(null);
        setLoading(false);
        let token = res.data.auth.access_token;
        let firstName = res.data.user.firstname;
        let lastName = res.data.user.lastname;
        let id = res.data.user.id;
        let email = res.data.user.email;
        dispatch(Login(token, '', firstName, lastName, id, email));
        await AsyncStorage.setItem('Token', token);
      } else {
        setError(res.errors);
        setLoading(false);
      }
    });
  };

  //===================== END ====================

  // ================= Validation funtion with formik ==========================
  const userInfo = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object({
    // email: yup.string().label('email').required('Email is required').email(),
    email: yup
      .string()
      .label('email')
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: yup.string().label('password').required('Password is required'),
  });

  // ================= END ===================================

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <ImageBackground
        style={styles.imageBackground}
        source={images.splashBackground}>
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={values => {
            Login_User(values);
            //dispatch(Login('', '', '', '', '', ''));
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => {
            const {email, password} = values;
            return (
              <>
                <View
                  style={[
                    Styles.logoStyle,
                    {marginTop: !isKeyboardVisible ? hp(10) : hp(4)},
                  ]}>
                  <LoginImage />
                </View>
                <View style={styles.bottomContainer}>
                  <View
                    style={
                      !isKeyboardVisible
                        ? Styles.firstColumn
                        : Styles.firstColumn1
                    }>
                    <Text style={styles.signinStyle}>{SIGN_IN}</Text>
                    <Text style={styles.enterEmailStyle}>
                      {ENTER_EMAIL_PASSWORD}
                    </Text>
                  </View>

                  <View style={{marginTop: hp(-2)}}>
                    <TextField
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      title={EMAIL_LABEL}
                      placeholder={EMAIL_PLACEHOLDER}
                      svg={<User marginVertical={hp(2)} />}
                    />
                    {touched.email && errors.email && (
                      <Text style={Styles.warningStyle}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={{marginTop: hp(2)}}>
                    <PasswordField
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      title={PASSWORD_LABEL}
                      placeholder={PASSWORD_PLACEHOLDER}
                      svg={<Lock marginVertical={hp(2)} />}
                    />
                    {touched.password && errors.password && (
                      <Text style={Styles.warningStyle}>{errors.password}</Text>
                    )}
                    {error != null ? (
                      <Text style={Styles.warningStyle}>{error}</Text>
                    ) : null}
                  </View>

                  <View style={styles.gradientView}>
                    <GradientButton
                      onPress={handleSubmit}
                      title={LOGIN_BUTTON_TITTLE}
                      condition={loading}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ForgotScreen')}
                    style={styles.forgotView}>
                    <Text style={styles.forgotStyle}>
                      {FORGOT_PASSWORD_LABEL}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

const Styles = {
  warningStyle: {
    marginHorizontal: wp(5),
    marginTop: hp('0.5%'),
    fontSize: wp('3.4%'),
    color: 'red',
  },
  logoStyle: {
    marginTop: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstColumn: {
    marginTop: hp(10),
    marginHorizontal: wp(6),
    marginBottom: hp(4),
  },
  firstColumn1: {
    marginTop: hp(6),
    marginHorizontal: wp(6),
    marginBottom: hp(4),
  },
};
