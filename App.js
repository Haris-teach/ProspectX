import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigations/StackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/index';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InAppNotification from './src/components/InAppNotification/view';

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background notifications:    ', remoteMessage);
  }),
);

const App = () => {
  useEffect(() => {
    getToken();
    //checkNotification();
  }, []);

  const getToken = () => {
    messaging()
      .getToken()
      .then(resp => {
        console.log('Token', resp);
        AsyncStorage.setItem('fcmToken', resp);
      });
  };

  // const checkNotification = () => {
  //   addNotificationListener = () => {
  //     this.messageForeGround();
  //     this.messageBackGround();
  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //       console.log('onNotificationOpenedApp', remoteMessage.notification);
  //     });
  //     messaging()
  //       .getInitialNotification()
  //       .then(remoteMessage => {
  //         console.log('getInitialNotification', remoteMessage);
  //       });
  //   };
  //   messageForeGround = () => {
  //     return messaging().onMessage(async remoteMessage => {
  //       EventRegister.emit('InAppNotification', remoteMessage);
  //       console.log('onMessageForGround====>', remoteMessage);
  //     });
  //   };
  //   messageBackGround = () => {
  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //       // console.log('setBackgroundMessageHandler', remoteMessage);
  //     });
  //   };
  // };

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
      }
    })
    .catch(reason => console.log('App::getInitialNotification', reason));

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('onNotification open MESSAGE:   ', remoteMessage);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('unSubcribe  MESSAGE:   ', remoteMessage);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
