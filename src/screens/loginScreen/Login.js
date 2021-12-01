//========================================== React Native Import Files ===========================

import React, { useState } from "react";
import { ImageBackground, View,Text, TouchableOpacity,ScrollView} from "react-native";

//========================================== Local Import Files ===================================
import images from "../../assets/images/Images";
import Styles from "./Style";
import LoginImage from "../../assets/images/loginImage.svg"
import User from "../../assets/images/user.svg";
import Lock from "../../assets/images/lock.svg";
import TextField from "../../components/textInput/TextInput";
import colors from "../../assets/colors/Colors";
import EyeOn from "../../assets/images/eye.svg";
import EyeOff from "../../assets/images/eyeoff.svg"
import GradientButton from "../../components/gradientButton/Button";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { heightPercentageToDP } from "react-native-responsive-screen";
const LoginScreen = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [securePass,setSecurePass] = useState(true);
return (
    <KeyboardAvoidingView style={Styles.imageBackground} behavior={Platform.OS === "ios" ? 'padding' : null}>
 
<ImageBackground style={Styles.imageBackground} source={images.loginBackground}>
<ScrollView style={Styles.imageBackground} showsVerticalScrollIndicator={false}>
  
   <View style={Styles.logoStyle}>
       <LoginImage/>
   </View>
   <View style={Styles.bottomContainer}>
       <View style={Styles.firstColumn}>
            <Text style={Styles.signinStyle}>Sign in</Text>
            <Text style={Styles.enterEmailStyle}>Enter your email address and password</Text>
       </View>
       <View style={Styles.inputViewStyle}>
       <View style={Styles.inputContainer}>
           <Text style={Styles.labelStyle}>Enter your email</Text>
           <View style={Styles.inputRowView}>
           <View style={Styles.inputRow}>
        <User/>
       <TextField
            placeholder={'Email'}
            placeHolderColor={colors.fieldtitleColor}
            value = {email}
            keyboardType = {'email-address'}
            secureTextEntry={false}
            onChangeText={(email) => setEmail(email)}
       />
               </View>
          
           </View>
       </View>
       <View style={Styles.inputContainer}>
           <Text style={Styles.labelStyle}>Password</Text>
           <View style={Styles.inputRowView}>
           <View style={Styles.inputRow}>
        <Lock/>
        <TextField
            placeholder={'Password'}
            placeHolderColor={colors.fieldtitleColor}
            value = {password}
            secureTextEntry={securePass}
            onChangeText={(password) => setPassword(password)}
       />
       <TouchableOpacity onPress = {()=> setSecurePass(!securePass)}>
     {securePass === false ? <EyeOn/> : <EyeOff/>}
     
       </TouchableOpacity>
           </View>
           </View>
           
       </View>
       </View>
       <View style={Styles.gradientView}>
      <GradientButton
         onPress = {()=>alert('Login Pressed')}
         title={'Login'}  
      />
</View>
<TouchableOpacity style={Styles.forgotView}>
    <Text style={Styles.forgotStyle}>Forgot Password?</Text>
</TouchableOpacity>
</View>
</ScrollView>

</ImageBackground>
</KeyboardAvoidingView>
)
}
export default LoginScreen;