//========================================= React Native Import Files =================================

import React from "react";
import { TextInput,StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

//========================================= Local Import Files =======================================


const TextField = (props)=>{
 
return (  <TextInput
    style={Styles.input}
    // onChangeText={onChangeNumber}
    value={props.value}
    placeholder={props.placeholder}
    placeholderTextColor={props.placeHolderColor}
    textAlign={'left'}
    keyboardType={props.keyboardType}
    secureTextEntry={props.secureTextEntry}
    onChangeText={props.onChangeText}

/>)


}
export default TextField;



const Styles = StyleSheet.create({
    input: {
        // height: 50,
        // margin: 12,
        // top:10,
        paddingHorizontal:10,
        width:'100%',
        borderColor:'transparent',
        borderWidth: 2,
        borderRadius:5
        // padding: 10,
      },
})