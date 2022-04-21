//========================================= React Native Import Files ===========================
import React from 'react';
import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  PermissionsAndroid,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Platform,
} from 'react-native';
//======================================== Local Import Files ====================================
import AllStyles from '../../all_styles/All_Styles';
import images from '../../assets/images/Images';
import CallDecline from '../../assets/images/calldecline.svg';
import {StackActions} from '@react-navigation/native';
import RNCallKeep from 'react-native-callkeep';
import {
  EventType,
  RNTwilioPhone,
  twilioPhoneEmitter,
} from 'react-native-twilio-phone';
import {CALL_TOKEN_API} from '../../HitApis/Urls';
import HitApi from '../../HitApis/APIHandler';
import {useSelector} from 'react-redux';
import {isInProgress} from 'react-native-document-picker';

// Options passed to CallKeep (https://github.com/react-native-webrtc/react-native-callkeep#usage)
const callKeepOptions = {
  ios: {
    appName: 'ProspecX',
    supportsVideo: false,
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'OK',
    additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'com.prospectx.app',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
    },
  },
};

// RNTwilioPhone options
const options = {
  requestPermissionsOnInit: true, // Default: true - Set to false if you want to request permissions manually
};

const identity = Platform.select({
  ios: 'Steve',
  android: 'Larry',
});

// const from = Platform.select({
//   ios: 'client:Steve',
//   android: 'client:Larry',
// });

// const from = Platform.select({
//   ios: '+12058584164',
//   android: '+12058584164',
// });

const CallStart = props => {
  console.log('CallStart==> ', props);
  const [mute, setMute] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  var [timerState, setTimerState] = useState(0);
  const [callStatus, setCallStatus] = useState('Connecting');

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
      props.navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {}, []);

  const [to, setTo] = React.useState(props.route.params.name);
  const [callInProgress, setCallInProgress] = React.useState(false);
  const token = useSelector(state => state.authReducer.token);

  React.useEffect(() => {
    return RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken);
  }, []);

  async function fetchAccessToken() {
    const accessToken = await HitApi(CALL_TOKEN_API, 'get', '', token);

    // const accessToken = props.route.params.accessToken

    console.log('fetchAccessToken999==> ', accessToken);

    // return accessToken;
    return accessToken.data.token;
  }

  React.useEffect(() => {
    const subscriptions = [
      twilioPhoneEmitter.addListener(EventType.CallConnected, () => {
        setCallInProgress(true);
        setCallStatus('Connected');
        timer();
      }),
      twilioPhoneEmitter.addListener(EventType.CallDisconnected, () => {
        hangup();
        setCallInProgress(RNTwilioPhone.calls.length > 0);
        setCallStatus('Disconnected');
      }),
      twilioPhoneEmitter.addListener(EventType.CallDisconnectedError, data => {
        console.log(data);
        // setCallInProgress(RNTwilioPhone.calls.length > 0);
        hangup();
        // setCallStatus("Error Occurred")
      }),
      twilioPhoneEmitter.addListener(EventType.CallConnectFailure, () => {
        console.log('CallConnectFailure');
        hangup();

        // setCallInProgress(RNTwilioPhone.calls.length > 0);
        // setCallStatus("CallConnectFailure")
      }),
      twilioPhoneEmitter.addListener(EventType.CancelledCallInvite, () => {
        console.log('CancelledCallInvite');
        hangup();
        // setCallInProgress(RNTwilioPhone.calls.length > 0);
        // setCallStatus("CallDecline")
      }),
    ];

    return () => {
      subscriptions.map(subscription => {
        subscription.remove();
      });
    };
  }, []);

  function hangup() {
    RNCallKeep.endAllCalls();

    props.navigation.dispatch(StackActions.replace('Home'));
  }

  useEffect(() => {
    call();
  }, []);

  async function call() {
    if (to === '') {
      return;
    }

    setCallInProgress(true);

    try {
      await RNTwilioPhone.startCall(to, to, props.route.params.fromNum);
    } catch (e) {
      console.log(e);
      setCallInProgress(false);
    }
  }

  async function unregister() {
    try {
      await RNTwilioPhone.unregister();
      hangup();
    } catch (e) {
      console.log(e);
    }
  }

  let content;

  if (callInProgress) {
    content = (
      <View>
        <ActivityIndicator color="#999" style={styles.loader} />
        <Button title="End call" onPress={hangup} />
      </View>
    );
  } else {
    content = (
      <View>
        <TextInput
          style={styles.to}
          onChangeText={text => setTo(text)}
          value={to}
          placeholder="Client or phone number"
          placeholderTextColor="gray"
        />
        <Button title="Start call" onPress={call} />
        <View style={styles.unregister}>
          <Button title="Unregister" onPress={unregister} />
        </View>
      </View>
    );
  }
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
          {callStatus === 'Connected' && (
            <Text style={AllStyles.incomingRingingStyle}>
              {' '}
              {minutes > 59 ? (hours < 10 ? `0${hours}` : hours) : null}{' '}
              {hours === 1 ? `:` : null}{' '}
              {minutes < 10 ? `0${minutes}` : minutes} :{' '}
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          )}
          <Text style={AllStyles.incomingRingingStyle}>{callStatus}</Text>
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
              // TwilioVoice.destroy();
              // TwilioVoice.disconnect();
              // props.navigation.navigate('Home');
              // RNCallKeep.endCall(props.route.params.callUUID);

              if (isInProgress) hangup();
              else unregister();
            }}
            style={AllStyles.startCallDeclineButton}>
            <CallDecline />
          </TouchableOpacity>
        </LinearGradient>

        {/* {
          content
        } */}
      </View>
    </ImageBackground>
    // </SafeAreaView>
  );
};
export default CallStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginBottom: 40,
  },
  to: {
    height: 50,
    width: 200,
    fontSize: 16,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 40,
    color: 'gray',
    textAlign: 'center',
  },
  unregister: {
    marginTop: 40,
  },
});
