//==================================== React Native Import Files ==========================
import React, { useState } from "react";
import { KeyboardAvoidingView,ImageBackground ,ScrollView,View,TouchableOpacity,Text} from "react-native";
//=================================== Local Import Files
import AllStyles from "../../all_styles/All_Styles";
import BackArrow from "../../assets/Images/backarrow.svg";
import images from "../../assets/Images/Images";
import {RESET_PASSWORD_TITLE,RESET_PASSWORD_SUBTEXT,ENTER_PASSWORD_LABEL,PASSWORD_PLACEHOLDER, ENTER_CONFIRM_PASSWORD_LABEL, RESET_BUTTON_TEXT} from "../../constants/ConstStrings";
import PasswordField from "../../components/PasswordInput/PasswordInput";
import Lock from "../../assets/Images/lock.svg";
import GradientButton from "../../components/GradientButton/Button";
const ResetPassword = (props)=>{
 
     const [newPassword,setNewPassword] = useState('')  
     const [confirmNewPassword,setConfirmNewpassword]= useState('')


    return(
        <KeyboardAvoidingView style={AllStyles.mainContainer} behavior={Platform.OS === "ios" ? 'padding' : null}>
    <ImageBackground source={images.splashBackground} style={AllStyles.mainContainer}>
    <ScrollView style={AllStyles.mainContainer} showsVerticalScrollIndicator={false}>
       
    <View style={AllStyles.headerView}>
      <TouchableOpacity onPress={()=>props.navigation.goBack(null)} style={AllStyles.backArrowWidth}>
      <BackArrow/>
      </TouchableOpacity>
      </View>
      <View style={AllStyles.bottomContainer}>
       <View style={AllStyles.firstColumn}>
            <Text style={AllStyles.signinStyle}>{RESET_PASSWORD_TITLE}</Text>
            <Text style={AllStyles.enterEmailStyle}>{RESET_PASSWORD_SUBTEXT}</Text>
       </View>
       <View style={AllStyles.resetinputViewStyle}>
           <PasswordField
           onChange={(newPassword) => setNewPassword(newPassword)}
           title={ENTER_PASSWORD_LABEL}
           placeholder={PASSWORD_PLACEHOLDER}
           value={newPassword}
           svg = {<Lock/>}
           />
            <PasswordField
           onChange={(confirmNewPassword) => setConfirmNewpassword(confirmNewPassword)}
           title={ENTER_CONFIRM_PASSWORD_LABEL}
           placeholder={PASSWORD_PLACEHOLDER}
           value={confirmNewPassword}
           svg = {<Lock/>}
           />
           </View>
       </View>
       <View style={AllStyles.resetGradientView}>
      <GradientButton
         onPress = {()=>alert('Login Pressed')}
         title={RESET_BUTTON_TEXT}  
      />
</View>
       </ScrollView>
        </ImageBackground>
        </KeyboardAvoidingView>
    )

}
export default ResetPassword