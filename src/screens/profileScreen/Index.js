//============================= React Native Import Files =================================
import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import DocumentPicker from 'react-native-document-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
import {
  CHANGE_PASSWORD,
  LOGIN_SCREEN,
  SETTINGS_SCREEN,
} from '../../constants/Navigator';
import Settings from '../../assets/images/settings.svg';
import ChangePassword from '../../assets/images/unlock.svg';
import Logout from '../../assets/images/logout.svg';
import {logout} from '../../redux/Actions/authActions';
import ProfilePic from '../../assets/svg/Profile.svg';

const ProfileScreen = props => {
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();
  const [fileUri, setFileURI] = useState(null);
  const [isLodaing, setIsLoading] = useState(false);

  // const Documentpicker = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     });
  //     console.log(
  //       // res.uri,
  //       // res.type, // mime type
  //       // res.name,
  //       // res.size,
  //       res.map(i => i.uri),
  //     );
  //     let uri = res.map(i => i.name);
  //     setFileURI(uri.toString());
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  const LogOut = async () => {
    setIsLoading(true);

    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let params = {
      fcm_token: fcmToken,
    };
    HitApi(LOGOUT, 'post', params, token).then(res => {
      if (res.status == 1) {
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

      {/* <TouchableOpacity
        disabled={true}
        style={AllStyles.profileImageView}
        // onPress={() => Documentpicker()}
      > */}
      <Image
        //source={images.profile}
        source={require('../../assets/png/profile.png')}
        style={AllStyles.profileImageStyle}
        resizeMode="cover"
      />

      {/* </TouchableOpacity> */}

      <View style={AllStyles.profileComponentInnerRow}>
        {/* <ProfileComponent
          onPress={() => props.navigation.navigate('Setting')}
          title={PROFILE_SETTINGS}
          backgroundColor={colors.profileSettingColor}
          svg={<Settings />}
        /> */}
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
