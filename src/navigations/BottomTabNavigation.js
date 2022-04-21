import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform, StyleSheet, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';

// =======================local import=========================

import CallScreen from '../screens/callScreen/callScreen';
import MsgScreen from '../screens/msgScreen/MsgScreen';
import MailScreen from '../screens/mailScreen/mailScreen';

//==============================================================

// ===================SVGS====================

import Phone from '../assets/svg/phone.svg';
import Msg from '../assets/svg/msg.svg';
import Mail from '../assets/svg/mail.svg';
import PhoneFill from '../assets/svg/phonefill.svg';
import MsgFill from '../assets/svg/msgfill.svg';
import MailFill from '../assets/svg/mailfill.svg';

//=================================================

const Tab = createBottomTabNavigator();
const customTabBarStyle = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: 'rgba(127, 90, 255, 1)',
    borderRadius: wp(10),
    marginHorizontal: wp(6),
    position: 'absolute',
    bottom: 0,
    elevation: 20,
    height: hp(6.5),
    borderTopWidth: 0,
    marginBottom: hp(1),
  },
};

const height_screen = Dimensions.get('window').height;
console.log('HEIGHT:   ', height_screen);

const TabScreen = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={customTabBarStyle}
      //initialRouteName={location}
    >
      <Tab.Screen
        name="Call"
        component={CallScreen}
        options={{
          tabBarIcon: ({focused}) => {
            //dispatch(GetTabLocation('Call'));
            return !focused ? <Phone /> : <PhoneFill />;
          },
          // tabBarButton: props => (
          //   <TouchableOpacity onPress={() => console.log('Pressed')} />
          // ),

          tabBarItemStyle: {
            borderRadius: 15,
            alignSelf: 'center',
            height: hp('7%'),
            marginLeft: wp('3%'),
            marginRight: wp('3%'),
            marginBottom:
              Platform.OS === 'ios'
                ? height_screen < 675
                  ? hp(1)
                  : height_screen == 736
                  ? hp(0)
                  : -hp(3.5)
                : hp(0),
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={MsgScreen}
        options={{
          tabBarActiveTintColor: 'white',
          tabBarIcon: ({focused}) => {
            return !focused ? <Msg /> : <MsgFill />;
          },

          tabBarItemStyle: {
            borderRadius: 15,
            height: hp('7%'),
            alignSelf: 'center',
            marginLeft: wp('3%'),
            marginRight: wp('3%'),
            alignItems: 'center',
            alignContent: 'center',
            marginBottom:
              Platform.OS === 'ios'
                ? height_screen < 675
                  ? hp(1)
                  : height_screen == 736
                  ? hp(0)
                  : -hp(3.5)
                : hp(0),
          },
        }}
      />
      <Tab.Screen
        name="Mail"
        component={MailScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return !focused ? <Mail /> : <MailFill />;
          },
          tabBarItemStyle: {
            borderRadius: 15,
            height: hp('7%'),
            alignSelf: 'center',
            marginLeft: wp('3%'),
            marginRight: wp('3%'),
            marginBottom:
              Platform.OS === 'ios'
                ? height_screen < 675
                  ? hp(1)
                  : height_screen == 736
                  ? hp(0)
                  : -hp(3.5)
                : hp(0),
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;

const styles = StyleSheet.create({
  iconStyle: {
    width: wp('5%'),
    height: hp('3%'),
  },
});
