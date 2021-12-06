//========================================== React Native Import Files ===========================

import React, { useState } from "react";
import { ImageBackground, View,Text, TouchableOpacity,ScrollView, TextInput} from "react-native";
//========================================== Local Import Files ===================================
import images from "../../assets/Images/Images";
import styles from "./Style";
import LoginImage from "../../assets/Images/loginImage.svg"
import User from "../../assets/Images/user.svg";
import Lock from "../../assets/Images/lock.svg";
import GradientButton from "../../components/GradientButton/Button";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER, ENTER_EMAIL_PASSWORD, FORGOT_PASSWORD_LABEL, LOGIN_BUTTON_TITTLE, PASSWORD_LABEL, PASSWORD_PLACEHOLDER, SIGN_IN } from "../../constants/ConstStrings";
import { FORGOT_PASSWORD } from "../../constants/Navigator";
import TextField from "../../components/TextInput/TextInput";
import PasswordField from "../../components/PasswordInput/PasswordInput";
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
           <TextField
           onChange={(email) => setEmail(email)}
           title={EMAIL_LABEL}
           placeholder={EMAIL_PLACEHOLDER}
           value={email}
           svg = {<User/>}
           />
            <PasswordField
           onChange={(password) => setPassword(password)}
           title={PASSWORD_LABEL}
           placeholder={PASSWORD_PLACEHOLDER}
           value={password}
           svg = {<Lock/>}
           />
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