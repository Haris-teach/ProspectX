//========================================= React Native Import Files =================================

import React from "react";
import { TextInput,View ,Text} from "react-native";

//========================================= Local Import Files =======================================

import AllStyles from "../../all_styles/All_Styles";
import colors from "../../assets/Colors/Colors";

const TextField = (props)=>{
 
return (  
 <View style={AllStyles.loginInputContainer}>
           <Text style={AllStyles.labelStyle}>{props.title}</Text>
           <View style={AllStyles.inputRow}>
        {props.svg}
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={colors.fieldtitleColor}
            value = {props.value}
            style={AllStyles.textFieldStyle}
            keyboardType = {'email-address'}
            onChangeText={props.onChange}
       />          
           </View>
       </View> 
)
}
export default TextField;

