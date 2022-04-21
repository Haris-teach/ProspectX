//=================================== React Native Import Files =====================

import React, {useRef, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
// import io from 'socket.io-client';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationPopup from 'react-native-push-notification-popup';
import RNCallKeep from 'react-native-callkeep';
//======================================= Local Import Files ===============================
import LoginScreen from '../screens/loginScreen/Index';
import SplashScreen from '../screens/splashScreen/Index';
import HitApi from '../HitApis/APIHandler';
import {logout} from '../redux/Actions/authActions';
import {LOGOUT, CALL_TOKEN_API} from '../HitApis/Urls';
import ForgotPassword from '../screens/forgotPassword/Index';
import ResetPassword from '../screens/resetPassword/Index';
import TabScreen from '../navigations/BottomTabNavigation';
import OtpScreen from '../screens/otpScreen/otpScreen';
import ProfileScreen from '../screens/profileScreen/Index';
import ChangePassword from '../screens/changePasswordscreen/Index';
import SettingsScreen from '../screens/settingsScreen/Index';
import CallStart from '../screens/startCallScreen/Index';
import IncomingCalls from '../screens/incomingCallScreen/Index';
import NotificationScreen from '../screens/notificationScreen/notificationScreen';
import ChatScreen from '../screens/chatScreen/chatScreen';
import MailInbox from '../screens/mailMsgScreen/mailMsgScreen';
import NewMailScreen from '../screens/newMailScreen/newMailScreen';
import {GetTwilioToken} from '../redux/Actions/commonAction';
import uuid from 'uuid';

import axios from 'axios';

const RootStack = createNativeStackNavigator();
const Stack = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.authReducer.isLogin);
  const token = useSelector(state => state.authReducer.token);
  const notiNumber = useSelector(state => state.commonReducer.notiNumber);

  const [items, setItems] = useState([]);
  const location = useSelector(state => state.notPresistReducer.location);

  const LogOut = async () => {
    dispatch(logout());
    await RNTwilioPhone.unregister();
    await RNTwilioPhone.removeCall();
    await RNTwilioPhone.removeCallKeepListeners();
    await RNTwilioPhone.removeTwilioPhoneListeners();
  };

  useEffect(() => {
    var config = {
      method: 'get',
      url: CALL_TOKEN_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (res) {
        // console.log('Twilio Response is:   ', res.data.data.token);
        // dispatch(GetTwilioToken(res.data.data.token));

        console.log('Twilio Response for toke is:   ', res.data);
        dispatch(GetTwilioToken(res.data.token));
      })
      .catch(function (error) {
        console.log('error::::::  ', error.response.status);
        LogOut();
      });
  }, [isLogin]);

  // initialize the Programmable Voice SDK passing an access token obtained from the server.
  // Listen to deviceReady and deviceNotReady events to see whether the initialization succeeded.

  let popup = useRef(null);
  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    messaging()
      .getToken()
      .then(resp => {
        console.log('FCM Token', resp);
        AsyncStorage.setItem('fcmToken', resp);
      });
  };

  const requestUserPermission = async () => {
    await messaging().requestPermission();
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('initialNotifition MESSAGE:   ', remoteMessage);
        //handleNotification(remoteMessage);
      }
    })
    .catch(reason => console.log('App::getInitialNotification', reason));

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('unSubcribe  MESSAGE:   ', remoteMessage);
      handleNotification(remoteMessage);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getNewUuid = () => uuid.v4().toLowerCase();
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background notifications:    ', remoteMessage);

    const callUUID = getNewUuid();

    // if (Platform.OS === 'android') {
    // NativeModules.RNCallKeep.displayIncomingCall(callUUID, remoteMessage.data.twi_from, remoteMessage.data.twi_from, 'number', false);

    RNCallKeep.displayIncomingCall(
      callUUID,
      remoteMessage.data.twi_from,
      remoteMessage.data.twi_from,
      'number',
      false,
    );

    // }
    // else {
    // NativeModules.RNCallKeep.displayIncomingCall(callUUID, remoteMessage.data.twi_from, 'number', remoteMessage.data.twi_from, false, remoteMessage.data.twi_from);
    // NativeModules.RNCallKeep.displayIncomingCall(callUUID, callSid, 'app', "generic", false);
    // RCT_EXPORT_METHOD(displayIncomingCall:(NSString *)uuidString
    //                          handle:(NSString *)handle
    //                      handleType:(NSString *)handleType
    //                        hasVideo:(BOOL)hasVideo
    //             localizedCallerName:(NSString * _Nullable)localizedCallerName
    //                 supportsHolding:(BOOL)supportsHolding
    //                    supportsDTMF:(BOOL)supportsDTMF
    //                supportsGrouping:(BOOL)supportsGrouping
    //              supportsUngrouping:(BOOL)supportsUngrouping)
    // }

    // NativeModules.RNCallKeep.displayIncomingCall(TwilioPhone.getCallUUID())
    // NativeModules.RNCallKeep.displayIncomingCall(callUUID, remoteMessage.data.twi_from, remoteMessage.data.twi_from)
  });

  const AfterLoginAppContainer = () => {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerMode: 'none',
            headerShown: false,
          }}>
          <RootStack.Screen name={'Home'} component={TabScreen} />
          <RootStack.Screen name={'Profile'} component={ProfileScreen} />
          <RootStack.Screen name={'ChangePass'} component={ChangePassword} />
          <RootStack.Screen name={'Setting'} component={SettingsScreen} />
          <RootStack.Screen name={'CallStart'} component={CallStart} />
          <RootStack.Screen name={'InComming'} component={IncomingCalls} />
          <RootStack.Screen name={'Chat'} component={ChatScreen} />
          <RootStack.Screen name={'MailIndox'} component={MailInbox} />
          <RootStack.Screen name={'NewMailScreen'} component={NewMailScreen} />
          <RootStack.Screen
            name={'Notification'}
            component={NotificationScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  };

  const BeforeLoginAppContainer = () => {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerMode: 'none',
            headerShown: false,
          }}>
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          <RootStack.Screen name="ForgotScreen" component={ForgotPassword} />
          <RootStack.Screen name="ResetScreen" component={ResetPassword} />
          <RootStack.Screen name="OtpScreen" component={OtpScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  };

  const handleNotification = remoteMessage => {
    popup.current.show({
      appIconSource: null,
      appTitle: 'ProspectX',
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      slideOutTime: 2000,
    });
  };

  const renderCustomPopup = ({
    appIconSource,
    appTitle,
    timeText,
    title,
    body,
  }) => (
    <TouchableOpacity style={styles.popUpStyle}>
      <View style={styles.popUpHeaderStyle}>
        <View style={styles.mergeStyle}>
          <Image
            source={require('../assets/png/1024.png')}
            resizeMode="contain"
            style={styles.notiIcon}
          />
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
        <Text style={styles.nowStyle}>Now</Text>
      </View>

      <Text style={styles.bodyStyle} numberOfLines={2}>
        {body}
      </Text>
    </TouchableOpacity>
  );

  if (isLogin == false) {
    return <BeforeLoginAppContainer />;
  } else {
    return (
      <>
        <AfterLoginAppContainer />
        <NotificationPopup
          ref={popup}
          renderPopupContent={renderCustomPopup}
          shouldChildHandleResponderStart={true}
          shouldChildHandleResponderMove={true}
        />
      </>
    );
  }
};
export default Stack;

const styles = {
  popUpStyle: {
    marginHorizontal: '2%',
    backgroundColor: 'rgba(14, 34, 71, 0.26)',
    borderRadius: 12,
    height: 70,
  },
  popUpHeaderStyle: {
    backgroundColor: '#7B6CFF',
    height: 25,
    flexDirection: 'row',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'space-between',
  },
  notiIcon: {width: 25, height: 25, borderTopLeftRadius: 12},
  titleStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
    alignSelf: 'center',
  },
  bodyStyle: {color: 'black', fontSize: 13, marginHorizontal: 4},
  mergeStyle: {flexDirection: 'row', flex: 1},
  nowStyle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
    marginHorizontal: 5,
  },
};
