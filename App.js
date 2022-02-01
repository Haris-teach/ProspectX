import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigations/StackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/index';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationPopup from 'react-native-push-notification-popup';
import {AppRegistry} from 'react-native';

const App = () => {
  // AppRegistry.registerHeadlessTask(
  //   'RNFirebaseBackgroundMessage',
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Background notifications:    ', remoteMessage);
  //     // dispatch(GetNotification(parseInt(NotifiNumber) + 1));
  //     handleNotification(remoteMessage);
  //   }),
  // );

  // let popup = useRef(null);
  // useEffect(() => {
  //   getToken();
  // }, []);

  // const getToken = () => {
  //   messaging()
  //     .getToken()
  //     .then(resp => {
  //       console.log('FCM Token', resp);
  //       AsyncStorage.setItem('fcmToken', resp);
  //     });
  // };

  // const requestUserPermission = async () => {
  //   await messaging().requestPermission();
  // };

  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log('initialNotifition MESSAGE:   ', remoteMessage);
  //       //handleNotification(remoteMessage);
  //     }
  //   })
  //   .catch(reason => console.log('App::getInitialNotification', reason));

  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log('onNotification open MESSAGE:   ', remoteMessage);
  //   handleNotification(remoteMessage);
  // });

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Background notifications:    ', remoteMessage);
  //   // dispatch(GetNotification());
  //   handleNotification(remoteMessage);
  // });

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(remoteMessage => {
  //     //dispatch(GetNotification());
  //     console.log('unSubcribe  MESSAGE:   ', remoteMessage);
  //     //console.log('Notofhjfjh:   ', NotifiNumber);
  //     handleNotification(remoteMessage);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // const handleNotification = remoteMessage => {
  //   popup.current.show({
  //     appIconSource: null,
  //     appTitle: 'ProspectX',
  //     title: remoteMessage.notification.title,
  //     body: remoteMessage.notification.body,
  //     slideOutTime: 3000,
  //   });
  // };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
        {/* <NotificationPopup ref={popup} /> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
