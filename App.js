import React, {useEffect, useRef} from 'react';
import {LogBox, View, Text, AppState, AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigations/StackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/index';
import messaging from '@react-native-firebase/messaging';
import NotificationPopup from 'react-native-push-notification-popup';
import InAppNotification from './src/components/InAppNotification/view';
import {GetTwilioToken} from './src/redux/Actions/commonAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    const data = remoteMessage.data;

    if (data.type === 'seekRequest') {
      setTimeout(() => {
        store.dispatch(setCallData(data));
        store.dispatch(setCallModal(true));
      }, 2000);
    }
  }),
);

const App = () => {
  let popup = useRef(null);

  useEffect(() => {
    getToken();
    checkNotification();
  }, []);

  const getToken = () => {
    messaging()
      .getToken()
      .then(resp => {
        console.log('Token', resp);
        AsyncStorage.setItem('fcmToken', resp);
      });
  };

  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       handleNotification(remoteMessage);
  //     }
  //   })
  //   .catch(reason => console.log('App::getInitialNotification', reason));

  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   handleNotification(remoteMessage);
  // });

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(remoteMessage => {
  //     handleNotification(remoteMessage);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const handleNotification = remoteMessage => {
    const data = remoteMessage.data;

    popup.current.show({
      //onPress: () => {},
      appIconSource: '',
      appTitle: 'ProspectX',
      title: 'Cloude msg',
      body: 'this is notification msg',
      slideOutTime: 3000,
    });
  };

  const checkNotification = () => {
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
        // console.log('setBackgroundMessageHandler', remoteMessage);
      });
    };
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
        {/* <NotificationPopup ref={popup} /> */}
        <InAppNotification
          vibrate
          interval={4500}
          onPress={remoteMessage => {
            // console.log('remoteMessage', remoteMessage);
          }}
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
