// import {View, Text} from 'react-native';
import React from 'react';
import Main from './src/screens/Main';
import {PaperProvider} from 'react-native-paper';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

import PushNotification from 'react-native-push-notification';
import {setToken} from './src/redux/reducers/deviceToken';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
    store.dispatch(setToken(token));
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;
