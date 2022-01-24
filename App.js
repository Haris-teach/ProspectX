import React, {useEffect, useRef} from 'react';
import {LogBox, View, Text, AppState, AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigations/StackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/index';
import messaging from '@react-native-firebase/messaging';
import NotificationPopup from 'react-native-push-notification-popup';

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  messaging().setBackgroundMessageHandler(async remoteMessage => {}),
);

const App = () => {
  let popup = useRef(null);

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
        handleNotification(remoteMessage);
      }
    })
    .catch(reason => console.log('App::getInitialNotification', reason));

  messaging().onNotificationOpenedApp(remoteMessage => {
    handleNotification(remoteMessage);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      handleNotification(remoteMessage);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNotification = remoteMessage => {
    const data = remoteMessage.data;
    popup.current.show({
      appIconSource: '',
      appTitle: 'ChatApp',
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      slideOutTime: 3000,
    });
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
        <NotificationPopup ref={popup} />
      </PersistGate>
    </Provider>
  );
};

export default App;
