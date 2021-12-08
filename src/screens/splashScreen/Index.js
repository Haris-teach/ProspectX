//==================================== React Native Import Files ================================
import * as React from 'react';
import {useEffect} from 'react';
import {ImageBackground, Image} from 'react-native';
//====================================== Local Import Files ===========================================
import Styles from './Styles';
import images from '../../assets/images/Images';
import {LOGIN_SCREEN} from '../../constants/Navigator';

const SplashScreen = props => {
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = () => {
    setTimeout(() => {
      props.navigation.replace(LOGIN_SCREEN);
    }, 2000);
  };
  return (
    <ImageBackground
      source={images.splashBackground}
      style={Styles.backgroundImage}>
      <Image source={images.splashLoader} style={Styles.iconViewStyle} />
    </ImageBackground>
  );
};

export default SplashScreen;
