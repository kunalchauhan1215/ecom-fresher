import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Signup from './src/pages/Auth/Signup';
import Login from './src/pages/Auth/Login';
import ForgotPassword from './src/pages/Auth/ForgotPassword';
import ResetPassword from './src/pages/Auth/ResetPassword';
// import Verification from './src/pages/Auth/Verification';
// import VerifyOTP from './src/pages/Auth/VerifyOTP';
import Dashboard from './src/pages/Auth/Dashboard';
import { Platform } from 'react-native';


const Stack = createNativeStackNavigator();
const App = () => {

  useEffect(() => {
    if(Platform.OS === 'android'){
// Hide splash screen once the app is ready
      if (SplashScreen) {
        SplashScreen.hide();
      }
    }
    
  }, []);

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      {/* <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} /> */}
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App