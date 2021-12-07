//=================================== React Native Import Files ===============================

import React from "react";
import { ImageBackground } from "react-native";


//=================================== Local Import Files =======================================
import AllStyles from "../../all_styles/All_Styles";
import images from "../../assets/Images/Images";
import AppHeader from "../../components/AppHeadercomponent/Appheader"
import colors from "../../assets/Colors/Colors";
import BackArrow from "../../assets/Images/backarrow.svg"
import{SETTINGS} from "../../constants/ConstStrings"
const SettingsScreen = (props)=>{
return (
    <ImageBackground source={images.splashBackground} style={AllStyles.mainContainer}>
      <AppHeader
   leftIconBackgrounColor={colors.whiteColor}
   leftSvg={<BackArrow height={15} width={15}/>}
   title={SETTINGS}
   leftIconPress={()=>props.navigation.goBack(null)}
   />
    </ImageBackground>
)
}
export default SettingsScreen