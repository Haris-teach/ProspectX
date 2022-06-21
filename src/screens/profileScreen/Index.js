//============================= React Native Import Files =================================
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

//import DocumentPicker from 'react-native-document-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RNRestart from 'react-native-restart';

//============================= Local Import Files ========================================
import AllStyles from '../../all_styles/All_Styles';
import images from '../../assets/images/Images';
import AppHeader from '../../components/AppHeadercomponent/Appheader';
import colors from '../../assets/colors/Colors';
import BackArrow from '../../assets/images/backarrow.svg';
import ProfileComponent from '../../components/ProfileComponent/ProfileRow';
import HitApi from '../../HitApis/APIHandler';
import {LOGOUT} from '../../HitApis/Urls';
import {
  PROFILE_CHANGE_PASS,
  PROFILE_LOGOUT,
  PROFILE_SETTINGS,
} from '../../constants/ConstStrings';

import Settings from '../../assets/images/settings.svg';
import ChangePassword from '../../assets/images/unlock.svg';
import Logout from '../../assets/images/logout.svg';
import {logout} from '../../redux/Actions/authActions';
import ProfilePic from '../../assets/svg/Profile.svg';
import {RNTwilioPhone} from 'react-native-twilio-phone';

const ProfileScreen = props => {
  const token = useSelector(state => state.authReducer.token);
  const twilioToken = useSelector(state => state.commonReducer.twilioToken);

  const dispatch = useDispatch();

  const [isLodaing, setIsLoading] = useState(false);

  const LogOut = async () => {
    setIsLoading(true);

    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let params = {
      device_uuid: fcmToken,
    };
    HitApi(LOGOUT, 'post', params, token).then(async res => {
      if (res.status == 1) {
        try {
          await RNTwilioPhone.unregister();
        } catch (e) {
          console.log('Ungregister Error:    ', e);
        }

        await RNTwilioPhone.removeCall();
        await RNTwilioPhone.removeCallKeepListeners();
        await RNTwilioPhone.removeTwilioPhoneListeners();
        if (Platform.OS == 'ios') {
          RNRestart.Restart();
        }
        dispatch(logout());

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <ImageBackground
      style={AllStyles.mainContainer}
      source={images.splashBackground}>
      <View style={styles.appHeaderMainView}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            backgroundColor: 'white',
            height: 27,
            width: 28,
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: wp(2),
            justifyContent: 'center',
            shadowColor: '#0E2247',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 8,
          }}>
          <BackArrow height={15} width={15} />
          {props.leftSvg}
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/png/profile.png')}
        style={AllStyles.profileImageStyle}
        resizeMode="cover"
      />

      <View style={AllStyles.profileComponentInnerRow}>
        <ProfileComponent
          onPress={() => props.navigation.navigate('Setting')}
          title="Settings"
          backgroundColor={colors.profileChangePassColor}
          svg={<Settings />}
        />
        <ProfileComponent
          onPress={() => props.navigation.navigate('ChangePass')}
          title={PROFILE_CHANGE_PASS}
          backgroundColor={colors.profileChangePassColor}
          svg={<ChangePassword />}
        />
        <ProfileComponent
          onPress={() => LogOut()}
          title={PROFILE_LOGOUT}
          backgroundColor={colors.profileLogoutColor}
          svg={isLodaing ? <ActivityIndicator color="blue" /> : <Logout />}
        />
      </View>
    </ImageBackground>
  );
};
export default ProfileScreen;

const styles = {
  appHeaderMainView: {
    height: hp(15),
    flexDirection: 'row',
    marginHorizontal: wp(6),
    justifyContent: 'space-between',
  },
};
