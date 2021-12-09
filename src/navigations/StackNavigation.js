//=================================== React Native Import Files =====================

import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
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

const RootStack = createNativeStackNavigator();
const Stack = () => {
  const isLogin = useSelector(state => state.authReducer.isLogin);

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
