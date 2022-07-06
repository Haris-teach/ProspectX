//=================================== React Native Import Files ===============================
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
//=================================== Local Import Files =======================================
import AllStyles from '../../all_styles/All_Styles';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import BackArrow from '../../assets/images/backarrow.svg';
import images from '../../assets/images/Images';
import GradientButton from '../../components/gradientButton/Button';
import {SAVE} from '../../constants/ConstStrings';
import HitApi from '../../HitApis/APIHandler';
import {SETTING} from '../../HitApis/Urls';

const SettingsScreen = props => {
  const [isEmail, setIsEmail] = useState(false);
  const [isSms, setIsSms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = useSelector(state => state.authReducer.token);

  useEffect(() => {
    GetSettings();
  }, []);

  // ========== GET Settings function =======================

  const GetSettings = () => {
    setLoading(true);

    HitApi(SETTING, 'GET', '', token)
      .then(res => {
        if (res.status == 1) {
          setError(null);
          setLoading(false);
          setIsEmail(res.data.email_notification);
          setIsSms(res.data.sms_notification);
        } else {
          setError(res.errors);
          setLoading(false);
        }
      })
      .catch(e => {
        Toast.show('Resquest is not successfull', Toast.SHORT, [
          'UIAlertController',
        ]);
        setLoading(false);
      });
  };

  // ===================== END =================================

  //============= Put Settings funtion ==============

  const PutSettings = () => {
    setLoading(true);

    let params = {
      email_notification: isEmail,
      sms_notification: isSms,
    };

    HitApi(SETTING, 'PUT', params, token)
      .then(res => {
        if (res.status == 1) {
          setError(null);
          setLoading(false);
          props.navigation.goBack();
        } else {
          setError(res.errors);
          setLoading(false);
        }
      })
      .catch(e => {
        Toast.show('Resquest is not successfull', Toast.SHORT, [
          'UIAlertController',
        ]);
        setLoading(false);
      });
  };

  //========== END =================================

  return (
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
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* =============================================== */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: wp(12),
          marginTop: hp(10),
        }}>
        <Text style={AllStyles.settingsNotificationStyle}>Notifications</Text>
        <Switch
          trackColor={{false: 'green', true: colors.purpleColor}}
          thumbColor={isEmail ? colors.whiteColor : colors.purpleColor}
          ios_backgroundColor={colors.whiteColor}
          onValueChange={() => setIsEmail(!isEmail)}
          value={isEmail}
        />
      </View>

      <View style={AllStyles.settingsButtonView}>
        <GradientButton onPress={() => PutSettings()} title={SAVE} />
      </View>
    </ImageBackground>
  );
};
export default SettingsScreen;

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
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginRight: wp(10),
  },
};
