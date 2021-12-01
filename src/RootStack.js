//=================================== React Native Import Files =====================

import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";

//======================================= Local Import Files ===============================
import LoginScreen from './screens/loginScreen/Login';
import SplashScreen from './screens/splashScreen/Splash';



const RootStack = createNativeStackNavigator();
const Stack = ()=>{
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={'SplashScreen'} screenOptions={{headerShown:false}}>
            <RootStack.Screen name = {"SplashScreen"} component = {SplashScreen}/>
            <RootStack.Screen name = {"LoginScreen"}  component = {LoginScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
        );
}
export default Stack;