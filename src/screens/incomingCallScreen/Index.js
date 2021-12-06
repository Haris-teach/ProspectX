//================================ React Native Import Files ============================
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import SwipeButton from 'rn-swipe-button';
//================================ Local Import Files ==================================
import images from "../../assets/Images/Images"
import AllStyles from "../../all_styles/All_Styles"
import colors from "../../assets/Colors/Colors";
import { INCOMING_NUMBER, INCOMING_STATUS } from "../../constants/ConstStrings";
const IncomingCalls = ()=>{
return(<ImageBackground source={images.splashBackground} style={AllStyles.mainContainer}>
  <View style={AllStyles.incomingCallStartView}>
      <View style={AllStyles.incomingCallInnerView}>
      <Text style={AllStyles.incomingNumberStyle}>{INCOMING_NUMBER}</Text>
      <Text style={AllStyles.incomingRingingStyle}>{INCOMING_STATUS}</Text>
      </View>
  </View>
  <View style={AllStyles.incomingBottomStyle}>
      <View style={AllStyles.incomingSwipeBtnStyle}>
      <SwipeButton
            enableRightToLeftSwipe ={true}
            onSwipeSuccess={() => alert('success')}
            railBackgroundColor={'rgba(255, 255, 255, 0.46)'}
            railBorderColor={colors.whiteColor}
            railFillBackgroundColor={'rgba(255, 255, 255, 0.17)'}
            thumbIconBackgroundColor={'#00AB08'}
            enableRightToLeftSwipe={30}
            thumbIconBorderColor={'transparent'}
            shouldResetAfterSuccess={true}            
            titleColor={colors.purpleColor}
            resetAfterSuccessAnimDuration={20}
            thumbIconImageSource= {images.incomingPng}
            height={68}
            width={300}
            title="Slide to answer"
          />
      </View>
 </View>
</ImageBackground>)
}
export default IncomingCalls