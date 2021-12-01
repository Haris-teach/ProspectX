//==================================== React Native Import Files ================================
import * as React  from "react";
import { useEffect } from "react";
import { ImageBackground, View, } from "react-native";

//====================================== Local Import Files ===========================================
import Styles from "./Styles";
import SplashIcon from "../../assets/images/splashicon.svg";
import images from "../../assets/images/Images";




const SplashScreen = (props)=>{
   

    useEffect(() => {
        checkUser();
    },[])


    const checkUser = () => {
        setTimeout(() => {
            props.navigation.replace("LoginScreen")
        },2000)
    }

    return(
        <ImageBackground source={images.splashBackground} style={Styles.backgroundImage}>
        <View style={Styles.iconViewStyle}>
        <SplashIcon/>
        </View>
        </ImageBackground>
    )
}

export default SplashScreen;