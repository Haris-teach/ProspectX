/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Options passed to CallKeep (https://github.com/react-native-webrtc/react-native-callkeep#usage)

AppRegistry.registerComponent(appName, () => App);
