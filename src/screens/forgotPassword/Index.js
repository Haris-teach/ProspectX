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
import {Formik} from 'formik';
import * as yup from 'yup';
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

  const userInfo = {
    email: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .label('email')
      .required('Your email field is empty')
      .email(),
  });

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <ImageBackground
        source={images.splashBackground}
        style={styles.mainContainer}>
        {/* <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}> */}
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={values => {
            props.navigation.navigate('OtpScreen');
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
                  <View style={styles.headerView}>
                    <TouchableOpacity
                      onPress={() => props.navigation.goBack(null)}
                      style={styles.backArrowWidth}>
                      <BackArrow />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.titleTextStyle}>
                    {FORGOT_PASSWORD_TITLE}
                  </Text>

                  <Text style={styles.descTextStyle}>{DESC_TEXT}</Text>
                  <View style={{marginHorizontal: wp(6)}}>
                    <TextField
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      title={EMAIL_LABEL}
                      placeholder={EMAIL_PLACEHOLDER}
                      value={email}
                      svg={<User marginVertical={hp(2)} />}
                    />
                    {touched.email && errors.email && (
                      <Text style={Styles.warningStyle}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.bottomView}>
                    <View style={AllStyles.forgotGradientView}>
                      <GradientButton
                        title={SUBMIT}
                        //onPress={() => props.navigation.navigate('OtpScreen')}
                        onPress={handleSubmit}
                      />
                    </View>

                    {/* <TouchableOpacity
                onPress={() =>
                  alert('New Code has been sent to your given email')
                }>
                <Text style={styles.resendCodeStyle}>{RESEND_CODE}</Text>
              </TouchableOpacity> */}
                  </View>
                </View>
              </>
            );
          }}
        </Formik>
        {/* </ScrollView> */}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default ForgotPassword;

const Styles = {
  warningStyle: {
    marginHorizontal: wp(5),
    marginTop: hp('0.5%'),
    fontSize: wp('2.5%'),
    color: 'red',
  },
};
