//==================================== React Native Import Files ==========================
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
//=================================== Local Import Files
import AllStyles from '../../all_styles/All_Styles';
import images from '../../assets/images/Images';
import Lock from '../../assets/images/lock.svg';
import GradientButton from '../../components/gradientButton/Button';
import PasswordField from '../../components/PasswordInput/PasswordInput';
import {
  ENTER_CONFIRM_PASSWORD_LABEL,
  ENTER_PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  RESET_BUTTON_TEXT,
  RESET_PASSWORD_SUBTEXT,
  RESET_PASSWORD_TITLE,
} from '../../constants/ConstStrings';
import HitApi from '../../HitApis/APIHandler';
import {PASSWORDREST} from '../../HitApis/Urls';

const ResetPassword = props => {
  const token = useSelector(state => state.authReducer.token);

  const [isLoading, setIsLoading] = useState(false);

  // ========================== Password Reset function =========================

  const PasswordReset = v => {
    setIsLoading(true);
    let params = {
      email: props.route.params.email,
      password: v.password,
      password_confirmation: v.confirmPassword,
      token: props.route.params.token,
    };
    HitApi(PASSWORDREST, 'post', params, token).then(res => {
      if (res.status == 1) {
        props.navigation.navigate('LoginScreen');
      } else {
        Toast.show(res.errors[0], Toast.SHORT, ['UIAlertController']);
      }
      setIsLoading(false);
    });
  };

  // =========================== END ===============================

  // ========================= Formik Validation ===================

  const userInfo = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .label('password')
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/^[^-\s]+$/, '* This field cannot contain only blankspaces'),

    confirmPassword: yup
      .string()
      .label('confirmPassword')
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .min(8, 'Password must be at least 8 characters')
      .matches(/^[^-\s]+$/, '* This field cannot contain only blankspaces'),
  });

  // =======================  END ============================

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <ImageBackground
        source={images.splashBackground}
        style={AllStyles.mainContainer}>
        <ScrollView style={{flex: 1}}>
          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={values => {
              PasswordReset(values);
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
                  <View style={{flex: 1}}>
                    <View style={AllStyles.headerView}></View>

                    <Text style={AllStyles.signinStyle}>
                      {RESET_PASSWORD_TITLE}
                    </Text>
                    <Text style={AllStyles.enterEmailStyle}>
                      {RESET_PASSWORD_SUBTEXT}
                    </Text>

                    <View style={{marginHorizontal: wp(6), marginTop: hp(3)}}>
                      <PasswordField
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        title={ENTER_PASSWORD_LABEL}
                        placeholder={PASSWORD_PLACEHOLDER}
                        svg={<Lock marginVertical={hp(2)} />}
                      />
                      {touched.password && errors.password && (
                        <Text style={Styles.warningStyle}>
                          {errors.password}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{marginHorizontal: wp(6), marginVertical: hp(2)}}>
                      <PasswordField
                        onChange={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        title={ENTER_CONFIRM_PASSWORD_LABEL}
                        placeholder={PASSWORD_PLACEHOLDER}
                        svg={<Lock marginVertical={hp(2)} />}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={Styles.warningStyle}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={AllStyles.resetGradientView}>
                    <GradientButton
                      onPress={handleSubmit}
                      title={RESET_BUTTON_TEXT}
                      condition={isLoading}
                    />
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
export default ResetPassword;

const Styles = {
  warningStyle: {
    marginHorizontal: wp(5),
    marginTop: hp('0.5%'),
    fontSize: wp('3.4%'),
    color: 'red',
  },
};
