//========================================= React Native Import Files ===========================
import React from "react"
import { useEffect ,useState} from "react"
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackground ,View,Text,TouchableOpacity} from "react-native"
//======================================== Local Import Files ====================================
import AllStyles from "../../all_styles/All_Styles"
import images from "../../assets/Images/Images"
import Mike from "../../assets/Images/mike.svg"
import MuteMike from "../../assets/Images/mutemike.svg"
import CallDecline from "../../assets/Images/calldecline.svg"
import Speaker from "../../assets/Images/speaker.svg"
import {INCOMING_NUMBER, MUTE_TEXT, SPEAKER_TEXT} from "../../constants/ConstStrings"
const CallStart = (props)=>{
    const [mute,setMute] = useState(false)
    var [timerState,setTimerState] = useState(0);
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
       <View style={AllStyles.startCallfirstColumn}>
       <TouchableOpacity onPress={()=> setMute(!mute)} style={AllStyles.startCallMikeView}>
        {mute === true ? <MuteMike height={20} width={20}/> : <Mike height={20} width={20}/>}   
        
       </TouchableOpacity>
       <Text style={AllStyles.callStartMuteStyle}>{MUTE_TEXT}</Text>
       </View>
         
         <View style={AllStyles.startCallfirstColumn}>
         <TouchableOpacity style={AllStyles.startCallSpeakerView}>
           <Speaker height={20} width={20}/>
       </TouchableOpacity>
      <Text style={AllStyles.callStartSpeakerStyle}>{SPEAKER_TEXT}</Text>
         </View> 
      </View >

 </View>
 <View style={AllStyles.startCallBottomView}>
     <TouchableOpacity>
 <LinearGradient colors={[ '#F66E66','#E23434' ]}
      style={AllStyles.declineGradientButton} 
      start={{ y: 0.0, x: 0.0 }} end={{ y: 1.0, x: 1.0 }}>
     <TouchableOpacity style={AllStyles.startCallDeclineButton}>
         <CallDecline/>
     </TouchableOpacity>
     </LinearGradient>
     </TouchableOpacity>
 </View>
</ImageBackground>
    )
}
export default CallStart;