
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Login from '../../pages/Auth/Login';
// import Signup from '../../pages/Auth/Signup';
// import ForgotPassword from '../../pages/Auth/ForgotPassword';
// import ResetPassword from '../../pages/Auth/ResetPassword';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AppNavigation from '../AppRoutes/AppNavigation';
// import BottomTabNavigator from '../../components/BottomTabNavigator';

// const Stack = createStackNavigator();

// const AuthNavigation = () => {
//   return (
//     <NavigationContainer>
//     <Stack.Navigator initialRouteName="AppNavigation">
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Signup" component={Signup} />
//       <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
//       <Stack.Screen name="ResetPassword" component={ResetPassword}/>
//        <Stack.Screen
//                 name="HomeTabs"
//                 component={BottomTabNavigator}
//                 options={{ headerShown: false }}
//               />
//       <Stack.Screen name="AppNavigation" component={AppNavigation} options={{ headerShown: false }}  />

//     </Stack.Navigator>
//   </NavigationContainer>
//   )
// }

// export default AuthNavigation

// const styles = StyleSheet.create({})





// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from '../../pages/Auth/Login';
// import Signup from '../../pages/Auth/Signup';
// import ForgotPassword from '../../pages/Auth/ForgotPassword';
// import ResetPassword from '../../pages/Auth/ResetPassword';
// import AppNavigation from '../AppRoutes/AppNavigation';

// const Stack = createStackNavigator();

// const AuthNavigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//         <Stack.Screen name="ResetPassword" component={ResetPassword} />
//         <Stack.Screen
//           name="AppNavigation"
//           component={AppNavigation}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AuthNavigation;

/////////////////////////////////////////////


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../pages/Auth/Login';
import AppNavigation from '../AppRoutes/AppNavigation';
import Signup from '../../pages/Auth/Signup';
import ForgotPassword from '../../pages/Auth/ForgotPassword';
import ResetPassword from '../../pages/Auth/ResetPassword';
import Cart from '../../pages/cartPage/Cart';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="AppNavigation" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="AppNavigation" component={AppNavigation} />
      {/* <Stack.Screen name="cart" component={Cart} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;