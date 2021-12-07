//============================= React Native Import Files =================================
import React from "react";
import { ImageBackground, View,Image,} from "react-native";



//============================= Local Import Files ========================================
import AllStyles from "../../all_styles/All_Styles";
import images from "../../assets/Images/Images";
import AppHeader from "../../components/AppHeadercomponent/Appheader";
import colors from "../../assets/Colors/Colors";
import ForwardArrow from "../../assets/Images/forwardarrow.svg"
import ProfileComponent from "../../components/ProfileComponent/ProfileRow";
import { PROFILE_CHANGE_PASS, PROFILE_LOGOUT, PROFILE_SETTINGS } from "../../constants/ConstStrings";
import {CHANGE_PASSWORD, LOGIN_SCREEN, SETTINGS_SCREEN} from "../../constants/Navigator"
import Settings from "../../assets/Images/settings.svg"
import ChangePassword from "../../assets/Images/unlock.svg"
import Logout from "../../assets/Images/logout.svg"
const ProfileScreen = (props)=>{

 return (<ImageBackground style={AllStyles.mainContainer} source={images.splashBackground}>

   <AppHeader
   rightBackgroundColor={colors.whiteColor}
   rightSvg={<ForwardArrow height={15} width={15}/>}
   />
   <View style={AllStyles.profileFirstContainer}>
     <View style={AllStyles.profileImageView}>
       <Image source={images.profile} style={AllStyles.profileImageStyle}/>
     </View>
   </View>
   <View style={AllStyles.profileBottomContainer}>
     <View style={AllStyles.profileOptionsContainer}>
       <View style={AllStyles.profileComponentInnerRow}
       >
         <ProfileComponent
       onPress={()=> props.navigation.navigate(SETTINGS_SCREEN)}
       title={PROFILE_SETTINGS}
       backgroundColor={colors.profileSettingColor}
       svg={<Settings/>}
       />
       <ProfileComponent
       onPress={()=> props.navigation.navigate(CHANGE_PASSWORD)}
       title={PROFILE_CHANGE_PASS}
       backgroundColor={colors.profileChangePassColor}
       svg={<ChangePassword/>}
       />
       <ProfileComponent
       onPress={()=> props.navigation.replace(LOGIN_SCREEN)}
       title={PROFILE_LOGOUT}
       backgroundColor={colors.profileLogoutColor}
       svg={<Logout/>}
       />

       </View>
    
     </View>
   </View>
   
 </ImageBackground>)




}
export default ProfileScreen