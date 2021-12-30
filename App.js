import React, {useEffect, useRef} from 'react';
import {LogBox, View, Text, AppState} from 'react-native';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigations/StackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/index';

const App = () => {
  LogBox.ignoreLogs(['Require cycle:', 'VirtualizedLists']);
  LogBox.ignoreLogs(['EventEmitter.removeListener']);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
