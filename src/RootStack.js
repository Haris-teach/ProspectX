import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from './screens/splashScreen/Splash';
import { createNativeStackNavigator} from "@react-navigation/native-stack";
const RootStack = createNativeStackNavigator();
const Stack = ()=>{
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={'BillingScreen'} screenOptions={{headerShown:false}}>
            <RootStack.Screen name = {"SplashScreen"} component = {SplashScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
        );
}
export default Stack;