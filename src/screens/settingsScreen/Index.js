//=================================== React Native Import Files ===============================
import React from "react";
import { useState } from "react";
import { ImageBackground, View,Text,Switch } from "react-native";
//=================================== Local Import Files =======================================
import AllStyles from "../../all_styles/All_Styles";
import images from "../../assets/Images/Images";
import AppHeader from "../../components/AppHeadercomponent/Appheader"
import colors from "../../assets/Colors/Colors";
import BackArrow from "../../assets/Images/backarrow.svg"
import{ENABLE_NOTIFICATIONS, SAVE, SETTINGS} from "../../constants/ConstStrings"
import GradientButton from "../../components/GradientButton/Button";
const SettingsScreen = (props)=>{
  const [isEnabled, setIsEnabled] = useState(false);
return (
    <ImageBackground source={images.splashBackground} style={AllStyles.mainContainer}>
      <AppHeader
   leftIconBackgrounColor={colors.whiteColor}
   leftSvg={<BackArrow height={15} width={15}/>}
   title={SETTINGS}
   leftIconPress={()=>props.navigation.goBack(null)}
   />
   <View style={AllStyles.settingsFirstView}>
     <View style={AllStyles.settingsRowView}>
       <Text style={AllStyles.settingsNotificationStyle}>{ENABLE_NOTIFICATIONS}</Text>
      <Switch
       style={AllStyles.settingsSwitchButtonStyle}
        trackColor={{ false: "green", true:colors.purpleColor }}
        thumbColor={isEnabled ? colors.whiteColor : colors.purpleColor}
        
        ios_backgroundColor={colors.whiteColor}
        onValueChange={()=>setIsEnabled(!isEnabled)}
        value={isEnabled}
      />
      
     </View>
   </View>
   <View style={AllStyles.settingsBottomContainer}>
     <View style={AllStyles.settingsButtonView}>
     <GradientButton
         onPress = {()=>alert('Login Pressed')}
         title={SAVE}
         />
     </View>
   </View>
    </ImageBackground>
)
}
export default SettingsScreen