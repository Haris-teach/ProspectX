//================================ React Native Import Files ============================
import React, {useEffect} from 'react';
import {ImageBackground, Text, View, Vibration} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import NotificationSounds, {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
//================================ Local Import Files ==================================
import images from '../../assets/images/Images';
import AllStyles from '../../all_styles/All_Styles';
import colors from '../../assets/colors/Colors';
import {
  INCOMING_NUMBER,
  INCOMING_STATUS,
  SWIPEBTNTITLE,
} from '../../constants/ConstStrings';
import fonts from '../../assets/fonts/Fonts';
import {CALL_START} from '../../constants/Navigator';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

var timer = null;
const IncomingCalls = props => {
  // const ONE_SECOND_IN_MS = 500;

  // const PATTERN = [
  //   1 * ONE_SECOND_IN_MS,
  //   2 * ONE_SECOND_IN_MS,
  //   3 * ONE_SECOND_IN_MS,
  // ];

  // useEffect(() => {
  //   CallFunction();
  // }, []);

  // const CallFunction = () => {
  //   NotificationSounds.getNotifications('ringtone').then(soundsList => {
  //     // console.log('SOUNDS=?', soundsList);

  //     Vibration.vibrate(PATTERN, true);
  //     /*
  //       Play the notification sound.
  //       pass the complete sound object.
  //       This function can be used for playing the sample sound
  //       */

  //     playSampleSound(soundsList[2]);

  //     setTimeout(() => {
  //       stopSampleSound();

  //       Vibration.cancel();
  //       props.navigation.goBack();
  //     }, 25000);

  //     // if you want to stop any playing sound just call:
  //     // stopSampleSound();
  //   });
  // };

  // const closeAll = () => {
  //   Vibration.cancel();
  //   stopSampleSound();
  //   clearInterval(timer);
  // };

  // const onSwipeSuccess = () => {
  //   props.navigation.navigate('CallStart', {
  //     name: props.route.params.name,
  //   });
  //   Vibration.cancel();
  //   stopSampleSound();
  //   clearInterval(timer);
  // };

  return (
    <ImageBackground
      source={images.splashBackground}
      style={AllStyles.mainContainer}>
      <View style={AllStyles.incomingCallStartView}>
        <View style={AllStyles.incomingCallInnerView}>
          <Text style={AllStyles.incomingNumberStyle}>
            {props.route.params.name}
          </Text>
          <Text style={AllStyles.incomingRingingStyle}>{INCOMING_STATUS}</Text>
        </View>
      </View>
      <View style={AllStyles.incomingBottomStyle}>
        <View style={AllStyles.incomingSwipeBtnStyle}>
          <SwipeButton
            enableRightToLeftSwipe={true}
            onSwipeSuccess={() =>
              props.navigation.navigate('CallStart', {
                name: props.route.params.name,
              })
            }
            railBackgroundColor={colors.railbackgroundColor}
            railBorderColor={colors.whiteColor}
            railFillBackgroundColor={colors.railFillBackgroundColor}
            railFillBorderColor={colors.whiteColor}
            thumbIconBackgroundColor={colors.thumbIconBackgroundColor}
            enableRightToLeftSwipe={30}
            thumbIconBorderColor={'transparent'}
            shouldResetAfterSuccess={true}
            titleColor={colors.purpleColor}
            resetAfterSuccessAnimDuration={20}
            thumbIconImageSource={images.incomingPng}
            height={58}
            titleStyles={AllStyles.swipeButtonTitleStyle}
            width={300}
            title={SWIPEBTNTITLE}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
export default IncomingCalls;
