//==================================== React Native Import Files ================================
import * as React  from "react";
import { useEffect } from "react";
import { ImageBackground, View, } from "react-native";

//====================================== Local Import Files ===========================================
import Styles from "./Styles";
import SplashIcon from "../../assets/Images/splashicon.svg";
import images from "../../assets/Images/Images";
import { LOGIN_SCREEN } from "../../constants/Navigator";

const SplashScreen = (props)=>{

    useEffect(() => {
        checkUser();
    },[])


    const checkUser = () => {
        setTimeout(() => {
            props.navigation.replace(LOGIN_SCREEN)
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