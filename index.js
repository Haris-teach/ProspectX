/**
 * @format
 */

import {AppRegistry, useEffect} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const RenderApp = async () => {
//   const token = await AsyncStorage.getItem('Token');

//   var socket = io('https://bb14-182-185-190-89.ngrok.io', {
//     transportOptions: {
//       polling: {
//         extraHeaders: {
//           authorization: `Bearer ${token}`,
//         },
//       },
//     },
//   });

//   socket.on('connect', function () {
//     console.log('Connected to Server');
//     socket.emit('subscribe', 'Creating the socket setting to user');
//   });
//   socket.on('notification', function (event) {
//     console.log(event);
//   });
// };

AppRegistry.registerComponent(appName, () => {
  //RenderApp();

  return App;
});
