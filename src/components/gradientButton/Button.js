//=========================================== React Native Import Files =====================================
import React from "react";
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from "react-native-responsive-screen";
import LinearGradient from 'react-native-linear-gradient';
import {Button, StyleSheet} from "react-native"

//=========================================== Local Import Files =============================================

import colors from "../../assets/colors/Colors";

const GradientButton = (props)=>{

    return ( <LinearGradient colors={[    '#6FB3FF',    '#7F5AFF' ]}
    style={Styles.gradientStyle} 
    start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>

    <Button  onPress={props.onPress} fontWeight={'bold'}  color={colors.whiteColor} style={Styles.buttonStyle}title={`${props.title}`}/>

</LinearGradient>)




}
export default GradientButton;



const Styles = StyleSheet.create({
  gradientStyle:{
    borderRadius: wp(7), 
    width: '95%',
    alignSelf:'center',
    height:hp(6),
    justifyContent:'center',
  },
  buttonStyle:{
    borderRadius: wp(7), 
    width: '90%',
    textAlign: 'center',
    fontWeight:'bold',
  }
})
