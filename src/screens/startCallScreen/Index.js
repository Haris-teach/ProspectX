//========================================= React Native Import Files ===========================
import React from "react"
import { useEffect } from "react"
import { ImageBackground ,View,Text,TouchableOpacity} from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"




//======================================== Local Import Files ====================================

import AllStyles from "../../all_styles/All_Styles"
import colors from "../../assets/Colors/Colors"
import images from "../../assets/Images/Images"
import Mike from "../../assets/Images/mike.svg"
import MuteMike from "../../assets/Images/mutemike.svg"
import CallDecline from "../../assets/Images/calldecline.svg"
import Speaker from "../../assets/Images/speaker.svg"
import {INCOMING_NUMBER,INCOMING_STATUS} from "../../constants/ConstStrings"
import { useState } from "react/cjs/react.development"
const CallStart = (props)=>{
    const [mute,setMute] = useState(false)
    var [timerState,setTimerState]           = useState(0);
    useEffect(()=>{
        timer();
     },[])


     const timer = () => {
         let count=timerState
        messageTime = setInterval(() => {
count=count+1

            setTimerState(count)
        },1000)
      }
      let hours    = Math.floor(timerState/ 3600);
      let minutes  = Math.floor(timerState/ 60 % 60);
      let seconds  = Math.floor(timerState % 60);
    return(
<ImageBackground source={images.splashBackground} style={AllStyles.mainContainer}>
<View style={AllStyles.incomingCallStartView}>
      <View style={AllStyles.incomingCallInnerView}>
      <Text style={AllStyles.incomingNumberStyle}>{INCOMING_NUMBER}</Text>
      <Text style={AllStyles.incomingRingingStyle}> {minutes >59 ? hours<10 ? `0${hours}`:hours :null } {hours==1 ? `:` : null} {minutes<10?`0${minutes}`:minutes} : {seconds<10?`0${seconds}`:seconds}</Text>
      </View>
  </View>
  <View style={AllStyles.callStartBottomView}>
      <View style={AllStyles.callStartButtonRow}>
     
          <TouchableOpacity onPress={()=> setMute(!mute)} style={AllStyles.startCallMikeView}>
        {mute === true ? <MuteMike height={25} width={25}/> : <Mike height={25} width={25}/>}   
        
       </TouchableOpacity>
       <TouchableOpacity style={AllStyles.startCallSpeakerView}>
           <Speaker height={25} width={25}/>
       </TouchableOpacity>
      </View>
 </View>
 <View style={AllStyles.startCallBottomView}>
     <TouchableOpacity style={AllStyles.startCallDeclineButton}>
         <CallDecline/>
     </TouchableOpacity>
 </View>
</ImageBackground>

    )
}
export default CallStart;