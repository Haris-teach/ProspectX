//========================================= React Native Import Files ===========================
import React from 'react';
import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import Toast from 'react-native-simple-toast';
//======================================== Local Import Files ====================================
import AllStyles from '../../all_styles/All_Styles';
import images from '../../assets/images/Images';
import Mike from '../../assets/images/mike.svg';
import MuteMike from '../../assets/images/mutemike.svg';
import CallDecline from '../../assets/images/calldecline.svg';
import Speaker from '../../assets/images/speaker.svg';
import {
  INCOMING_NUMBER,
  MUTE_TEXT,
  SPEAKER_TEXT,
} from '../../constants/ConstStrings';
import {PROFILE_SCREEN} from '../../constants/Navigator';
import TwilioVoice from 'react-native-twilio-voice-sdk';

const CallStart = props => {
  const [mute, setMute] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  var [timerState, setTimerState] = useState(0);

  const timer = () => {
    let count = timerState;
    setInterval(() => {
      count = count + 1;
      setTimerState(count);
    }, 1000);
  };
  let hours = Math.floor(timerState / 3600);
  let minutes = Math.floor((timerState / 60) % 60);
  let seconds = Math.floor(timerState % 60);

  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate('Call');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    TwilioVoice.on('connect', call => {
      // timer();
      console.log('Call connect ho gi ha: ', call._state);
    });
    TwilioVoice.on('ringing', status => {
      console.log('Ringing:   ', status);
    });

    TwilioVoice.on('connectFailure', () => {
      console.log('connectFailure');
      Toast.show('Call not connect');
      props.navigation.navigate('Home');
    });
    TwilioVoice.on('reconnecting', () => {
      console.log('reconnecting');
    });
    TwilioVoice.on('reconnect', () => {
      console.log('reconnect');
    });
    TwilioVoice.on('disconnect', () => {
      console.log('disconnent');
      props.navigation.navigate('Home');
    });
    // TwilioVoice.on('ringing', () => {
    //   console.log('Ringing ho ri ha');
    // });
  }, []);

  return (
    //<SafeAreaView style={{flex: 1}}>
    <ImageBackground
      source={images.splashBackground}
      style={AllStyles.mainContainer}>
      <View style={AllStyles.incomingCallStartView}>
        <View style={AllStyles.incomingCallInnerView}>
          <Text style={AllStyles.incomingNumberStyle}>
            {props.route.params.name}
          </Text>
          <Text style={AllStyles.incomingRingingStyle}>
            {' '}
            {minutes > 59 ? (hours < 10 ? `0${hours}` : hours) : null}{' '}
            {hours === 1 ? `:` : null} {minutes < 10 ? `0${minutes}` : minutes}{' '}
            : {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </View>
      </View>
      <View style={AllStyles.callStartBottomView}>
        <View style={AllStyles.callStartButtonRow}>
          {/* <View style={AllStyles.startCallfirstColumn}>
            <TouchableOpacity
              onPress={() => setMute(!mute)}
              style={[AllStyles.startCallMikeView, {backgroundColor: 'white'}]}>
              {mute === true ? (
                <MuteMike height={20} width={20} />
              ) : (
                <Mike height={20} width={20} />
              )}
            </TouchableOpacity>
            <Text style={AllStyles.callStartMuteStyle}>{MUTE_TEXT}</Text>
          </View> */}

          {/* <View style={AllStyles.startCallfirstColumn}>
            <TouchableOpacity
              onPress={() => setIsSpeaker(!isSpeaker)}
              style={[
                AllStyles.startCallSpeakerView,
                {
                  backgroundColor:
                    isSpeaker == false ? 'white' : 'rgba(255,255,255,0.4)',
                },
              ]}>
              <Speaker height={20} width={20} />
            </TouchableOpacity>
            <Text style={AllStyles.callStartSpeakerStyle}>{SPEAKER_TEXT}</Text>
          </View> */}
        </View>
      </View>
      <View style={AllStyles.startCallBottomView}>
        <LinearGradient
          colors={['#F66E66', '#E23434']}
          style={AllStyles.declineGradientButton}
          start={{y: 0.0, x: 0.0}}
          end={{y: 1.0, x: 1.0}}>
          <TouchableOpacity
            onPress={() => {
              TwilioVoice.destroy();
              props.navigation.navigate('Home');
            }}
            style={AllStyles.startCallDeclineButton}>
            <CallDecline />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ImageBackground>
    // </SafeAreaView>
  );
};
export default CallStart;
