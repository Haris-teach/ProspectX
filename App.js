import React, {useEffect, useRef} from 'react';
import {LogBox, View, Text, AppState} from 'react-native';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigations/StackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/index';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // useEffect(async () => {
  //   try {
  //     LogBox.ignoreLogs(['Require cycle:', 'VirtualizedLists']);
  //     LogBox.ignoreLogs(['EventEmitter.removeListener']);
  //     const token = await AsyncStorage.getItem('Token');
  //     var socket = io('https://a6c5-182-185-215-252.ngrok.io', {
  //       transportOptions: {
  //         polling: {
  //           extraHeaders: {
  //             authorization: `Bearer ${token}`,
  //           },
  //         },
  //       },
  //     });

  //     socket.on('connect', function () {
  //       console.log('Connected to Server');
  //       socket.emit('subscribe', 'Creating the socket setting to user');
  //     });

  //     socket.on('receiveMessage', event => {
  //       console.log('Printing in Receive Message:  ', event.chatMessage);
  //     });
  //   } catch (e) {
  //     console.log('Error:   ', e);
  //   }
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
