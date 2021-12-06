//=================================== React Native Import Files =====================

import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
//======================================= Local Import Files ===============================
import LoginScreen from './screens/loginScreen/Index';
import SplashScreen from './screens/splashScreen/Index';
import { FORGOT_PASSWORD, INCOMING_CALLS, LOGIN_SCREEN, RESET_PASSWORD, SPLASH_SCREEN } from './constants/Navigator';
import ForgotPassword from './screens/forgotPassword/Index';
import ResetPassword from './screens/resetPassword/Index';
import IncomingCalls from './screens/incomingCallScreen/Index';



const RootStack = createNativeStackNavigator();
const Stack = ()=>{
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={SPLASH_SCREEN} screenOptions={{headerShown:false}}>
            <RootStack.Screen name={SPLASH_SCREEN} component={SplashScreen}/>
            <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen}/>
            <RootStack.Screen name={FORGOT_PASSWORD} component={ForgotPassword}/>
            <RootStack.Screen name={RESET_PASSWORD} component={ResetPassword}/>
            <RootStack.Screen name={INCOMING_CALLS} component={IncomingCalls}/>
            </RootStack.Navigator>
        </NavigationContainer>
        );
}
export default Stack;