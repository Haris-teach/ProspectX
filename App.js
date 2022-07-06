import React from 'react';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigations/StackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/index';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {
  RNTwilioPhone,
  twilioPhoneEmitter,
  EventType,
} from 'react-native-twilio-phone';
import RNCallKeep from 'react-native-callkeep';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
      </PersistGate>
    </Provider>
  );
};

const callKeepOptions = {
  ios: {
    appName: 'ProspectX',
    supportsVideo: false,
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'OK',
    additionalPermissions: [],

    foregroundService: {
      channelId: 'com.prospectx.app',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
    },
  },
};

RNCallKeep.setup(callKeepOptions).then(accepted => {
  console.log('RNCallKeep.setup', 'accepted==> ' + accepted);
});
RNTwilioPhone.handleBackgroundState(callKeepOptions);
RNCallKeep.checkPhoneAccountEnabled().then(response => {
  console.log('RNCallKeep.checkPhoneAccountEnabled', 'response==> ' + response);

  twilioPhoneEmitter.addListener(EventType.CallConnected, async sid => {
    console.log('Isconnected', sid.callSid);
  });
  twilioPhoneEmitter.addListener(EventType.CallDisconnected, () => {
    console.log('Disconnected');
  });
  twilioPhoneEmitter.addListener(EventType.CallDisconnectedError, data => {}),
    twilioPhoneEmitter.addListener(EventType.CallConnectFailure, () => {
      console.log('CallConnectFailure');
    });
});

export default App;
