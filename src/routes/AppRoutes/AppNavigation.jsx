// import { StyleSheet} from 'react-native'
// import React from 'react'
// import HomePage from '../../pages/HomePage/HomePage'
// import Profile from '../../pages/Profile/Profile'
// import { createDrawerNavigator } from '@react-navigation/drawer'
// import Setting from '../../pages/Setting/Setting'
// import Searching from '../../pages/Searching/Searching'
// import Swiper from '../../components/Swiper'

// const Drawer = createDrawerNavigator();

// const AppNavigation = () => {
//   return (
    
//     <Drawer.Navigator initialRouteName="HomePage">
//       <Drawer.Screen name="HomePage" component={HomePage} />
//       <Drawer.Screen name="Searching" component={Searching} />
//       <Drawer.Screen name="Profile" component={Profile} />
//       <Drawer.Screen name="Setting" component={Setting} />
//       <Drawer.Screen name="Swiper" component={Swiper} />
//     </Drawer.Navigator>
//   )
// }

// export default AppNavigation

// const styles = StyleSheet.create({})

import { StyleSheet } from 'react-native';
import React from 'react';
import HomePage from '../../pages/HomePage/HomePage';
import Profile from '../../pages/Profile/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Setting from '../../pages/Setting/Setting';
import Searching from '../../pages/Searching/Searching';
import Swiper from '../../components/Swiper';

const Drawer = createDrawerNavigator();

const AppNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        drawerActiveTintColor: '#800080', 
        drawerActiveBackgroundColor: '#E6CCE6', 
        headerTitle: '',
        headerShown: true,
      }}
    >
      <Drawer.Screen name="HomePage" component={HomePage}/>
      <Drawer.Screen name="Searching" component={Searching} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Swiper" component={Swiper} />
    </Drawer.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
