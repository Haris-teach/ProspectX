import React from 'react';
import messaging from '@react-native-firebase/messaging';
import {EventRegister} from 'react-native-event-listeners';

class ApiServices {
  constructor(props) {}

  addNotificationListener = () => {
    this.messageForeGround();
    this.messageBackGround();
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp', remoteMessage.notification);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('getInitialNotification', remoteMessage);
      });
  };
  messageForeGround = () => {
    return messaging().onMessage(async remoteMessage => {
      EventRegister.emit('InAppNotification', remoteMessage);
      console.log('onMessageForGround====>', remoteMessage);
    });
  };
  messageBackGround = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('setBackgroundMessageHandler', remoteMessage);
    });
  };
}

const apiService = new ApiServices();

export default apiService;
