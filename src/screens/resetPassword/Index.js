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
import * as yup from 'yup';
import {Formik} from 'formik';

const ResetPassword = props => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewpassword] = useState('');

  const userInfo = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .label('password')
      .required('Your password field is empty'),

    confirmPassword: yup
      .string()
      .label('confirmPassword')
      .required('Your password field is empty'),
  });

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
              props.navigation.navigate('LoginScreen');
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
                    <View style={AllStyles.headerView}>
                      <TouchableOpacity
                        onPress={() => props.navigation.goBack(null)}
                        style={AllStyles.backArrowWidth}>
                        <BackArrow />
                      </TouchableOpacity>
                    </View>

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
                      //onPress={() => props.navigation.navigate('LoginScreen')}
                      onPress={handleSubmit}
                      title={RESET_BUTTON_TEXT}
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
    fontSize: wp('2.5%'),
    color: 'red',
  },
};
