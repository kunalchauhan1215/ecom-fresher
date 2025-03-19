import { StyleSheet} from 'react-native'
import React from 'react'
import HomePage from '../../pages/HomePage/HomePage'
import Profile from '../../pages/Profile/Profile'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator();

const AppNavigation = () => {
  return (
    
    <Drawer.Navigator initialRouteName="HomePage">
      <Drawer.Screen name="HomePage" component={HomePage} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})