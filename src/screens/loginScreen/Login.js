//========================================== React Native Import Files ===========================

import React from "react";
import { ImageBackground,} from "react-native";

//========================================== Local Import Files ===================================
import images from "../../assets/images/Images";
import Styles from "./Style";

const LoginScreen = ()=>{
return (<ImageBackground style={Styles.imageBackground} source={images.splashBackground}>
 
</ImageBackground>)
}
export default LoginScreen;