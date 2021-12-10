//================================ React Native Import Files ============================
import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import SwipeButton from 'rn-swipe-button';
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
const IncomingCalls = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.splashBackground}
        style={AllStyles.mainContainer}>
        <View style={AllStyles.incomingCallStartView}>
          <View style={AllStyles.incomingCallInnerView}>
            <Text style={AllStyles.incomingNumberStyle}>{INCOMING_NUMBER}</Text>
            <Text style={AllStyles.incomingRingingStyle}>
              {INCOMING_STATUS}
            </Text>
          </View>
        </View>
        <View style={AllStyles.incomingBottomStyle}>
          <View style={AllStyles.incomingSwipeBtnStyle}>
            <SwipeButton
              enableRightToLeftSwipe={true}
              onSwipeSuccess={() => props.navigation.navigate('CallStart')}
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
    </SafeAreaView>
  );
};
export default IncomingCalls;
