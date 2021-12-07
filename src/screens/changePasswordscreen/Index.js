//========================================= React Native Import Files ============================

import React, { useState } from "react";
import { ImageBackground, Text, View, KeyboardAvoidingView,ScrollView } from "react-native";
import AllStyles from "../../all_styles/All_Styles";

//======================================== Local Import Files ====================================
import images from "../../assets/Images/Images"
import AppHeader from "../../components/AppHeadercomponent/Appheader";
import colors from "../../assets/Colors/Colors";
import BackArrow from "../../assets/Images/backarrow.svg"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import ChangePasswordComponent from "../../components/ChangePasswordComponent/ChangePassword";
import GradientButton from "../../components/GradientButton/Button";
import { CHANGE_PASS_TITLE, CONFIRM_PASSWORD, NEW_PASSWORD, OLD_PASSWORD,CHANGE_PASS_DESC } from "../../constants/ConstStrings";
const ChangePassword  =(props)=>{
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
return (
    <KeyboardAvoidingView style={AllStyles.mainContainer} behavior={Platform.OS === "ios" ? 'padding' : null}>

    <ImageBackground source={images.splashBackground} style={AllStyles.mainContainer}>
    <ScrollView style={AllStyles.mainContainer} showsVerticalScrollIndicator={false}>

       <AppHeader
   leftIconBackgrounColor={colors.whiteColor}
   leftSvg={<BackArrow height={15} width={15}/>}
   title={CHANGE_PASS_TITLE}
   leftIconPress={()=>props.navigation.goBack(null)}
   />
   <View style={AllStyles.changepasswordMainView}>
       <View style={AllStyles.changePasswordHeadingView}
       >
           <Text style={AllStyles.changePasswordDecStyle}>{CHANGE_PASS_DESC}</Text>
       </View>
       <View style={AllStyles.changePasswordComponentView}>
       <ChangePasswordComponent
       
       placeholder={OLD_PASSWORD}
       value={oldPassword}
       onChange={(oldPassword)=> setOldPassword(oldPassword)}
       />
       <ChangePasswordComponent
       
       placeholder={NEW_PASSWORD}
       value={newPassword}
       onChange={(newPassword)=>setNewPassword(newPassword)}
       />
       <ChangePasswordComponent
       
       placeholder={CONFIRM_PASSWORD}
       value = {confirmPassword}
       onChange={(confirmPassword)=> setConfirmPassword(confirmPassword)}
       
       />
       </View>
       <View style={AllStyles.changePasswordBottomView}>
           <View style={AllStyles.changePasswordButtonView}>
           <GradientButton
         onPress = {()=>alert('Login Pressed')}
         title={'Save'}  
      />
           </View>
       </View>
   </View>
   </ScrollView>
    </ImageBackground>
    </KeyboardAvoidingView>
)
}

export default ChangePassword