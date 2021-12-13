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
import {FORGOT_PASSWORD} from '../../constants/Navigator';
import TextField from '../../components/textInput/TextInput';
import PasswordField from '../../components/PasswordInput/PasswordInput';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePass, setSecurePass] = useState(true);

  const userInfo = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .label('email')
      .required('Your email field is empty')
      .email(),

    password: yup
      .string()
      .label('password')
      .required('Your password field is empty'),
  });

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <ImageBackground
        style={styles.imageBackground}
        source={images.splashBackground}>
        <ScrollView style={styles.imageBackground}>
          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={values => {
              dispatch(Login(null));
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
                        <Text style={Styles.warningStyle}>
                          {errors.password}
                        </Text>
                      )}
                    </View>

                    <View style={styles.gradientView}>
                      <GradientButton
                        onPress={handleSubmit}
                        title={LOGIN_BUTTON_TITTLE}
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
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

const Styles = {
  warningStyle: {
    marginHorizontal: wp(5),
    marginTop: hp('0.5%'),
    fontSize: wp('2.5%'),
    color: 'red',
  },
};
