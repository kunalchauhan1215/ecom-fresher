// import React from 'react'
// import { Text, View } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './src/pages/home/Home';

// import Search from './src/pages/home/Search';
// import Profile from './src/pages/home/Profile';
// import Settings from './src/pages/home/Settings';
// import BottomTabNavigator from './src/components/BottomTabNavigator';


// const Stack = createNativeStackNavigator();
// const App = () => {
//   return (
//     <NavigationContainer>
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Search" component={Search} />
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="Settings" component={Settings} />
//       <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
//     </Stack.Navigator>
//   </NavigationContainer>
//   )
// }

// export default App




// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import BottomTabNavigator from './src/components/BottomTabNavigator';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <BottomTabNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/pages/Auth/Signup';
import Login from './src/pages/Auth/Login';
import ForgotPassword from './src/pages/Auth/ForgotPassword';
import ResetPassword from './src/pages/Auth/ResetPassword';
import Dashboard from './src/pages/Auth/Dashboard';
import BottomTabNavigator from './src/components/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        {/* <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Dashboard" component={Dashboard} /> */}
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
