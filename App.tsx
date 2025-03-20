import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your components and pages
import Login from './src/pages/Auth/Login';
import Signup from './src/pages/Auth/Signup';
import SwiperTest from './src/components/SwiperTest';
import Details from './src/pages/home/Details';
import Cart from './src/components/Cart';
import Profile from '../ecom-fresher/src/components/Profile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SwiperTest">
        {/* Auth screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />

        {/* Main app screens */}
        <Stack.Screen name="SwiperTest" component={SwiperTest} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
