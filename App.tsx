import React from 'react';

import {persistor, store} from './src/redux/store/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import RouteManager from './src/routes/RouteManager';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteManager />
      </PersistGate>
    </Provider>
  );
};

export default App;
