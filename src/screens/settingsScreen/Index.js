//=================================== React Native Import Files ===============================
import React from 'react';
import {useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//=================================== Local Import Files =======================================
import AllStyles from '../../all_styles/All_Styles';
import images from '../../assets/images/Images';
import AppHeader from '../../components/AppHeadercomponent/Appheader';
import colors from '../../assets/colors/Colors';
import BackArrow from '../../assets/images/backarrow.svg';
import {
  ENABLE_NOTIFICATIONS,
  SAVE,
  SETTINGS,
} from '../../constants/ConstStrings';
import GradientButton from '../../components/gradientButton/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
const SettingsScreen = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
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
          <Text style={styles.headerText}>Setting</Text>
        </View>

        {/* =============================================== */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(12),
            marginTop: hp(10),
          }}>
          <Text style={AllStyles.settingsNotificationStyle}>
            {ENABLE_NOTIFICATIONS}
          </Text>
          <Switch
            style={AllStyles.settingsSwitchButtonStyle}
            trackColor={{false: 'green', true: colors.purpleColor}}
            thumbColor={isEnabled ? colors.whiteColor : colors.purpleColor}
            ios_backgroundColor={colors.whiteColor}
            onValueChange={() => setIsEnabled(!isEnabled)}
            value={isEnabled}
          />
        </View>

        <View style={AllStyles.settingsButtonView}>
          <GradientButton onPress={() => alert('Login Pressed')} title={SAVE} />
        </View>
      </ImageBackground>
    </SafeAreaView>
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
    height: hp(3.5),
    width: wp(7.7),
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
};
