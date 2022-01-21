//=================================== React Native Import Files =====================

import React, {useRef, useEffect, useState} from 'react';
import {StatusBar, AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';

//======================================= Local Import Files ===============================
import LoginScreen from '../screens/loginScreen/Index';
import SplashScreen from '../screens/splashScreen/Index';
import {
  CALL_START,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  INCOMING_CALLS,
  LOGIN_SCREEN,
  PROFILE_SCREEN,
  RESET_PASSWORD,
  SETTINGS_SCREEN,
  SPLASH_SCREEN,
} from '../constants/Navigator';
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

import axios from 'axios';

const RootStack = createNativeStackNavigator();
const Stack = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.authReducer.isLogin);
  const token = useSelector(state => state.authReducer.token);

  const [items, setItems] = useState([]);

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://bc44-182-185-152-98.ngrok.io/api/v1/commmunication/call/gettoken',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (res) {
        console.log('Response:   ', res.data.data.token);
        dispatch(GetTwilioToken(res.data.data.token));
      })
      .catch(function (error) {
        console.log('error:  ', error);
      });
  }, []);

  // initialize the Programmable Voice SDK passing an access token obtained from the server.
  // Listen to deviceReady and deviceNotReady events to see whether the initialization succeeded.

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

  if (isLogin == false) {
    return <BeforeLoginAppContainer />;
  } else {
    return <AfterLoginAppContainer />;
  }
};
export default Stack;
