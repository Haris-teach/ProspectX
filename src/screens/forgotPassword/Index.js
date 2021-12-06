//=========================================== React Native Import Files ========================
import React from "react";
import { useState } from "react";
import { View,KeyboardAvoidingView, ImageBackground,ScrollView,Text, TouchableOpacity } from "react-native";
import images from "../../assets/Images/Images";

//=========================================== Local Import Files ================================
import styles from "./Style";
import BackArrow from "../../assets/Images/backarrow.svg";
import { DESC_TEXT, EMAIL_LABEL,EMAIL_PLACEHOLDER,FORGOT_PASSWORD_TITLE, RESEND_CODE, SUBMIT} from "../../constants/ConstStrings";
import User from "../../assets/Images/user.svg";
import TextField from "../../components/TextInput/TextInput";
import GradientButton from "../../components/GradientButton/Button";
import { RESET_PASSWORD } from "../../constants/Navigator";
import AllStyles from "../../all_styles/All_Styles";
const ForgotPassword = (props)=>{

    const [email,setEmail] = useState('')

   return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === "ios" ? 'padding' : null}>
    <ImageBackground source={images.splashBackground} style={styles.mainContainer}>
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerView}>
      <TouchableOpacity onPress={()=>props.navigation.goBack(null)} style={styles.backArrowWidth}>
      <BackArrow/>
      </TouchableOpacity>
      </View>
        <View style={styles.startView}>
            <Text style={styles.titleTextStyle}>{FORGOT_PASSWORD_TITLE}</Text>
            <View style={styles.descTextView}>
            <Text style={styles.descTextStyle}>{DESC_TEXT}</Text>
            </View>
            <View style={styles.inputViewStyle}>
                <TextField
                title={EMAIL_LABEL}
                placeholder={EMAIL_PLACEHOLDER}
                value={email}
                svg={<User/>}
                onChange={(email)=> setEmail(email)}
                />
       </View>
        </View>
        <View style={styles.bottomView}>
          <View style={AllStyles.forgotGradientView}>
          <GradientButton 
            title={SUBMIT}
            onPress={()=> props.navigation.navigate(RESET_PASSWORD)}
        />
          </View>
       
        <TouchableOpacity 
        onPress={()=>alert('New Code has been sent to your given email')}
        style={styles.resendCodeStyle}>
            <Text>
            {RESEND_CODE}
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        </ImageBackground>  
       </KeyboardAvoidingView>
   )
}
export default ForgotPassword;