import React from 'react'

import AuthNavigation from './src/routes/AuthRoutes/AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';

// import {persistor, store} from ''
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store/Store';


const App = () => {
  return (
 
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
    <AuthNavigation/>
    </NavigationContainer>

  </PersistGate>
</Provider>
  )
}

export default App