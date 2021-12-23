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

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

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
import AllStyles from '../../all_styles/All_Styles';
import HitApi from '../../HitApis/APIHandler';
import {CHANGEPASS} from '../../HitApis/Urls';

const ChangePassword = props => {
  const token = useSelector(state => state.authReducer.token);
  const [isMessage, setIsMessage] = useState('');

  //============= Funtion for Change PAssword  ======================

  const PasswordChange = v => {
    //setLoading(true);

    let params = {
      old_password: v.oldPassword,
      password: v.password,
      password_confirmation: v.confirmPassword,
    };

    HitApi(CHANGEPASS, 'PUT', params, token).then(res => {
      if (res.status == 1) {
        Toast.showWithGravity(
          JSON.stringify(res.message),
          Toast.SHORT,
          Toast.BOTTOM,
        );
      } else {
        Toast.showWithGravity(
          JSON.stringify(res.errors),
          Toast.SHORT,
          Toast.BOTTOM,
        );
      }
    });
  };

  //===================== END ====================

  // ================= formik validations ============

  const userInfo = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object({
    oldPassword: yup
      .string()
      .label('oldPassword')
      .required('Old password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/^[^-\s]+$/, '* This field cannot contain only blankspaces'),

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

  //================= END ==========================

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
          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
              //props.navigation.navigate('LoginScreen');
              PasswordChange(values);
              // setIsMessage('');
              resetForm();
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => {
              const {password, oldPassword, confirmPassword} = values;
              return (
                <>
                  <Text style={styles.textStyle}>{CHANGE_PASS_DESC}</Text>

                  <ChangePasswordComponent
                    placeholder={OLD_PASSWORD}
                    value={oldPassword}
                    onChange={handleChange('oldPassword')}
                    onBlur={handleBlur('oldPassword')}
                    //svg={true}
                  />
                  {touched.oldPassword && errors.oldPassword && (
                    <Text style={styles.warningStyle}>
                      {errors.oldPassword}
                    </Text>
                  )}

                  <ChangePasswordComponent
                    placeholder={NEW_PASSWORD}
                    value={password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    svg={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.warningStyle}>{errors.password}</Text>
                  )}

                  <ChangePasswordComponent
                    placeholder={CONFIRM_PASSWORD}
                    value={confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    svg={true}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.warningStyle}>
                      {errors.confirmPassword}
                    </Text>
                  )}

                  <View
                    style={{
                      height: hp(25),
                      marginBottom: hp(10),
                      alignSelf: 'center',
                      width: wp(80),
                      justifyContent: 'flex-end',
                    }}>
                    <GradientButton
                      // onPress={() => alert('Login Pressed')}
                      onPress={() => {
                        handleSubmit();
                      }}
                      title={'Save'}
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

export default ChangePassword;

const styles = {
  headerContainer: {
    height: hp(15),
    alignItems: 'center',
    flexDirection: 'row',
  },

  backButton: {
    backgroundColor: colors.whiteColor,
    height: 27,
    width: 28,
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
  warningStyle: {
    marginHorizontal: wp(12),
    marginTop: hp('-1.4%'),
    fontSize: wp('3.4%'),
    color: 'red',
  },
};
