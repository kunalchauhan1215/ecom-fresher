import { StyleSheet } from 'react-native';
import React from 'react';
import Login from '../../pages/Auth/Login';
import Signup from '../../pages/Auth/Signup';
import ForgotPassword from '../../pages/Auth/ForgotPassword';
import ResetPassword from '../../pages/Auth/ResetPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from '../AppRoutes/AppNavigation';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <>
  
        <Stack.Navigator initialRouteName="AppNavigation">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="AppNavigation" component={AppNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
     

      {/* Toast Component */}
      <Toast />
    </>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
