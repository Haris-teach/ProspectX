//========================================== React Native Import Files ===========================

import React, { useState } from "react";
import { ImageBackground, View,Text, TouchableOpacity,ScrollView, TextInput} from "react-native";
//========================================== Local Import Files ===================================
import images from "../../assets/Images/Images";
import styles from "./Style";
import LoginImage from "../../assets/Images/loginImage.svg"
import User from "../../assets/Images/user.svg";
import Lock from "../../assets/Images/lock.svg";
import colors from "../../assets/Colors/Colors";
import EyeOn from "../../assets/Images/eye.svg";
import EyeOff from "../../assets/Images/eyeoff.svg"
import GradientButton from "../../components/GradientButton/Button";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER, ENTER_EMAIL_PASSWORD, FORGOT_PASSWORD_LABEL, LOGIN_BUTTON_TITTLE, PASSWORD_LABEL, PASSWORD_PLACEHOLDER, SIGN_IN } from "../../constants/ConstStrings";
import { FORGOT_PASSWORD } from "../../constants/Navigator";
const LoginScreen = (props)=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [securePass,setSecurePass] = useState(true);
return (
    <KeyboardAvoidingView style={styles.imageBackground} behavior={Platform.OS === "ios" ? 'padding' : null}>
<ImageBackground style={styles.imageBackground} source={images.splashBackground}>
<ScrollView style={styles.imageBackground} showsVerticalScrollIndicator={false}>
   <View style={styles.logoStyle}>
       <LoginImage/>
   </View>
   <View style={styles.bottomContainer}>
       <View style={styles.firstColumn}>
            <Text style={styles.signinStyle}>{SIGN_IN}</Text>
            <Text style={styles.enterEmailStyle}>{ENTER_EMAIL_PASSWORD}</Text>
       </View>
       <View style={styles.inputViewStyle}>
       <View style={styles.inputContainer}>
           <Text style={styles.labelStyle}>{EMAIL_LABEL}</Text>
           <View style={styles.inputRow}>
        <User/>
        <TextInput
            placeholder={EMAIL_PLACEHOLDER}
            placeholderTextColor={colors.fieldtitleColor}
            value = {email}
            style={styles.textFieldStyle}
            keyboardType = {'email-address'}
            secureTextEntry={false}
            onChangeText={(email) => setEmail(email)}
       />          
           </View>
       </View>
       <View style={styles.inputContainer}>
           <Text style={styles.labelStyle}>{PASSWORD_LABEL}</Text>
           <View style={styles.inputRow}>
        <Lock/>
        <TextInput
            placeholder={PASSWORD_PLACEHOLDER}
            placeholderTextColor={colors.fieldtitleColor}
            value = {password}
            style={styles.textFieldStyle}
            secureTextEntry={securePass}
            onChangeText={(password) => setPassword(password)}
       />
       <TouchableOpacity  onPress = {()=> setSecurePass(!securePass)}>
     {securePass === false ? <EyeOn/> : <EyeOff/>}
     
       </TouchableOpacity>
           </View>
       </View>
       </View>
       <View style={styles.gradientView}>
      <GradientButton
         onPress = {()=>alert('Login Pressed')}
         title={LOGIN_BUTTON_TITTLE}  
      />
</View>
<TouchableOpacity onPress={()=> props.navigation.navigate(FORGOT_PASSWORD)} style={styles.forgotView}>
    <Text style={styles.forgotStyle}>{FORGOT_PASSWORD_LABEL}</Text>
</TouchableOpacity>
</View>
</ScrollView>
</ImageBackground>
</KeyboardAvoidingView>
)
}
export default LoginScreen;