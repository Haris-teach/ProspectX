//================================ React Native Import Files ============================
import React, { useEffect } from 'react';
import { ImageBackground, Text, View, Vibration } from 'react-native';
import SwipeButton from 'rn-swipe-button';
import NotificationSounds, {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
//================================ Local Import Files ==================================
import images from '../../assets/images/Images';
import AllStyles from '../../all_styles/All_Styles';
import colors from '../../assets/colors/Colors';
import {
  INCOMING_STATUS,
  SWIPEBTNTITLE,
} from '../../constants/ConstStrings';
// import TwilioVoice from 'react-native-twilio-programmable-voice'
import {RNTwilioPhone, twilioPhoneEmitter } from 'react-native-twilio-phone';

var timer = null;
var setTime = null;
const IncomingCalls = props => {
  const ONE_SECOND_IN_MS = 500;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  // useEffect(() => {
  //   CallFunction();
  // }, []);

  const CallFunction = () => {
    NotificationSounds.getNotifications('ringtone').then(soundsList => {
      // console.log('SOUNDS=?', soundsList);

      Vibration.vibrate(PATTERN, true);
      /*
        Play the notification sound.
        pass the complete sound object.
        This function can be used for playing the sample sound
        */

      playSampleSound(soundsList[2]);

      setTime = setTimeout(() => {
        stopSampleSound();
        Vibration.cancel();
        props.navigation.goBack();
      }, 25000);

      // if you want to stop any playing sound just call:
      // stopSampleSound();
    });
  };

  // const closeAll = () => {
  //   Vibration.cancel();
  //   stopSampleSound();
  //   clearInterval(timer);
  // };

  // const SwipeSuccess = () => {
  //   Vibration.cancel();
  //   stopSampleSound();
  //   clearInterval(timer);
  //   clearTimeout(setTime);
  //   props.navigation.replace('CallStart', {
  //     name: props.route.params.name,
  //   });
  // };

  useEffect(()=>{
    console.log("props==>", props.data);

    const subscriptions = [
      twilioPhoneEmitter.addListener('CallConnected', (data) => {
        console.log(data);
      }),
      twilioPhoneEmitter.addListener('CallDisconnected', (data) => {
        console.log(data);
      }),
      twilioPhoneEmitter.addListener('CallDisconnectedError', (data) => {
        console.log(data);
      }),
    ];
  
    return () => {
      subscriptions.map((subscription) => {
        subscription.remove();
      });
    };

    // addTwilioListeners();
  },[])


  // const addTwilioListeners = async () => {

  //   // add listeners (flowtype notation)
  //   TwilioVoice.addEventListener('deviceReady', () => {
  //     // no data
  //   })
  //   TwilioVoice.addEventListener('deviceNotReady', (data) => {
  //     // {
  //     //     err: string
  //     // }
  //   })
  //   TwilioVoice.addEventListener('connectionDidConnect', (data) => {
  //     // {
  //     //     call_sid: string,  // Twilio call sid
  //     //     call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
  //     //     call_from: string, // "+441234567890"
  //     //     call_to: string,   // "client:bob"
  //     // }
  //   })
  //   TwilioVoice.addEventListener('connectionIsReconnecting', (data) => {
  //     // {
  //     //     call_sid: string,  // Twilio call sid
  //     //     call_from: string, // "+441234567890"
  //     //     call_to: string,   // "client:bob"
  //     // }

  //   })
  //   TwilioVoice.addEventListener('connectionDidReconnect', (data) => {
  //     // {
  //     //     call_sid: string,  // Twilio call sid
  //     //     call_from: string, // "+441234567890"
  //     //     call_to: string,   // "client:bob"
  //     // }

    
  //   })
  //   TwilioVoice.addEventListener('connectionDidDisconnect', (data) => {
  //     //   | null
  //     //   | {
  //     //       err: string
  //     //     }
  //     //   | {
  //     //         call_sid: string,  // Twilio call sid
  //     //         call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
  //     //         call_from: string, // "+441234567890"
  //     //         call_to: string,   // "client:bob"
  //     //         err?: string,
  //     //     }

  //     TwilioVoice.disconnect();
  //     props.navigation.goBack();
  //   })
  //   TwilioVoice.addEventListener('callStateRinging', (data) => {
  //     //   {
  //     //       call_sid: string,  // Twilio call sid
  //     //       call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
  //     //       call_from: string, // "+441234567890"
  //     //       call_to: string,   // "client:bob"
  //     //   }
  //   })
  //   TwilioVoice.addEventListener('callInviteCancelled', (data) => {
  //     //   {
  //     //       call_sid: string,  // Twilio call sid
  //     //       call_from: string, // "+441234567890"
  //     //       call_to: string,   // "client:bob"
  //     //   }
  //   })

  //   // iOS Only


  //   TwilioVoice.addEventListener('callRejected', 'callRejected', () => { })


  //   TwilioVoice.addEventListener('deviceDidReceiveIncoming', (data) => {
  //     console.log("deviceDidReceiveIncoming111 callscreen",data)
  //     // {
  //     //     call_sid: string,  // Twilio call sid
  //     //     call_from: string, // "+441234567890"
  //     //     call_to: string,   // "client:bob"
  //     // }


  //     // Alert.alert(
  //     //   //title
  //     //   'Incoming Call',
  //     //   //body
  //     //   `${data.call_from} Calling`,
  //     //   [
  //     //     {
  //     //       text: 'Accept',
  //     //       onPress: () => {
  //     //         TwilioVoice.accept();
  //     //       }
  //     //     },
  //     //     {
  //     //       text: 'Reject',
  //     //       onPress: () => {
  //     //         TwilioVoice.reject();

  //     //       }
  //     //     },
  //     //   ],
  //     //   {cancelable: false},
  //     //   //clicking out side of alert will not cancel
  //     // );

  //     // props.navigation.navigate('InComming',data);

      

  //   })

  //   // Android Only
  //   TwilioVoice.addEventListener('proximity', (data) => {
  //     // {
  //     //     isNear: boolean
  //     // }
  //   })

  //   // Android Only
  //   TwilioVoice.addEventListener('wiredHeadset', (data) => {
  //     // {
  //     //     isPlugged: boolean,
  //     //     hasMic: boolean,
  //     //     deviceName: string
  //     // }
  //   })





  // };

  return (
    <ImageBackground
      source={images.splashBackground}
      style={AllStyles.mainContainer}>
      <View style={AllStyles.incomingCallStartView}>
        <View style={AllStyles.incomingCallInnerView}>
          <Text style={AllStyles.incomingNumberStyle}>
            {props.route.params.name}
          </Text>
          <Text style={AllStyles.incomingRingingStyle}>{INCOMING_STATUS}</Text>
        </View>
      </View>
      <View style={AllStyles.incomingBottomStyle}>
        <View style={AllStyles.incomingSwipeBtnStyle}>
          <SwipeButton
            enableRightToLeftSwipe={true}
            onSwipeSuccess={() => {
              // TwilioVoice.accept();
              // props.navigation.replace('CallStart', {
              //   name: props.route.params.name,
              // })
              // RNTwilioPhone.a
            }
            }

            onSwipeFail={()=>{
              // TwilioVoice.reject();
              props.navigation.goBack();
              RNTwilioPhone.cancel();
            }}
            railBackgroundColor={colors.railbackgroundColor}
            railBorderColor={colors.whiteColor}
            railFillBackgroundColor={colors.railFillBackgroundColor}
            railFillBorderColor={colors.whiteColor}
            thumbIconBackgroundColor={colors.thumbIconBackgroundColor}
            // enableRightToLeftSwipe={30}
            thumbIconBorderColor={'transparent'}
            shouldResetAfterSuccess={true}
            titleColor={colors.purpleColor}
            resetAfterSuccessAnimDuration={20}
            thumbIconImageSource={images.incomingPng}
            height={58}
            titleStyles={AllStyles.swipeButtonTitleStyle}
            width={300}
            title={SWIPEBTNTITLE}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
export default IncomingCalls;
