//============================= React Native Import Files =================================
import React from 'react';
import {ImageBackground, View, Image} from 'react-native';

//============================= Local Import Files ========================================
import AllStyles from '../../all_styles/All_Styles';
import images from '../../assets/images/Images';
import AppHeader from '../../components/AppHeadercomponent/Appheader';
import colors from '../../assets/colors/Colors';
import BackArrow from '../../assets/images/backarrow.svg';
import ProfileComponent from '../../components/ProfileComponent/ProfileRow';
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
import {SafeAreaView} from 'react-native-safe-area-context';
const ProfileScreen = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={AllStyles.mainContainer}
        source={images.splashBackground}>
        <AppHeader
          leftIconBackgrounColor={colors.whiteColor}
          leftSvg={<BackArrow height={15} width={15} />}
          leftIconPress={() => props.navigation.goBack(null)}
        />

        <View style={AllStyles.profileImageView}>
          <Image source={images.profile} style={AllStyles.profileImageStyle} />
        </View>

        <View style={AllStyles.profileComponentInnerRow}>
          <ProfileComponent
            onPress={() => props.navigation.navigate(SETTINGS_SCREEN)}
            title={PROFILE_SETTINGS}
            backgroundColor={colors.profileSettingColor}
            svg={<Settings />}
          />
          <ProfileComponent
            onPress={() => props.navigation.navigate(CHANGE_PASSWORD)}
            title={PROFILE_CHANGE_PASS}
            backgroundColor={colors.profileChangePassColor}
            svg={<ChangePassword />}
          />
          <ProfileComponent
            onPress={() => props.navigation.replace(LOGIN_SCREEN)}
            title={PROFILE_LOGOUT}
            backgroundColor={colors.profileLogoutColor}
            svg={<Logout />}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ProfileScreen;
