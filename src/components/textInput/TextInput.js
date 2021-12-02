//========================================= React Native Import Files =================================

import React from "react";
import { TextInput,StyleSheet } from "react-native";
import { heightPercentageToDP as hp ,  } from "react-native-responsive-screen";

//========================================= Local Import Files =======================================


const TextField = (props)=>{
 
return (  
<TextInput
    style={Styles.input}
    value={props.value}
    placeholder={props.placeholder}
    placeholderTextColor={props.placeHolderColor}
    keyboardType={props.keyboardType}
    secureTextEntry={props.secureTextEntry}
    onChangeText={props.onChangeText}
/>
)


}
export default TextField;



const Styles = StyleSheet.create({
    input: {
        paddingHorizontal:10,
        width:'100%',
        borderColor:'transparent',
        borderWidth: 2,
        height:hp(2),
        height:hp(3),
        borderRadius:5
      },
})