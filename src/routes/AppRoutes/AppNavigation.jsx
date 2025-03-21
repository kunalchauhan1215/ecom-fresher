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


// import React, { useState } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Animated, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import HomePage from '../../pages/HomePage/HomePage';
// import Searching from '../../pages/Searching/Searching';
// import Profile from '../../pages/Profile/Profile';
// import Setting from '../../pages/Setting/Setting';
// import AddProduct from '../../components/AddProduct';
// import Swiper from '../../components/Swiper';
// import HomePage from '../../pages/HomePage/HomePage';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// // Base Tab Navigator that will be used across all screens
// const TabNavigator = ({ initialRoute, navigation }) => {
//   return (
//     <Tab.Navigator
//       initialRouteName={initialRoute}
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color }) => {
//           let iconName;
//           const scaleValue = new Animated.Value(1);

//           if (focused) {
//             Animated.spring(scaleValue, {
//               toValue: 1.2,
//               friction: 3,
//               useNativeDriver: true,
//             }).start();
//           } else {
//             scaleValue.setValue(1);
//           }

//           switch (route.name) {
//             case 'Home':
//               iconName = focused ? 'home' : 'home-outline';
//               break;
//             case 'Search':
//               iconName = focused ? 'search' : 'search-outline';
//               break;
//             case 'AddProduct':
//               iconName = focused ? 'add-circle' : 'add-circle-outline';
//               break;
//             case 'Profile':
//               iconName = focused ? 'person' : 'person-outline';
//               break;
//             case 'Settings':
//               iconName = focused ? 'settings' : 'settings-outline';
//               break;
//             case 'SwiperTest':
//               iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
//               break;
//             default:
//               iconName = 'help-circle';
//           }

//           return (
//             <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
//               <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />
//             </Animated.View>
//           );
//         },
//         tabBarActiveTintColor: '#6366f1',
//         tabBarInactiveTintColor: '#64748b',
//         tabBarStyle: styles.tabBar,
//         tabBarLabelStyle: styles.labelStyle,
//         headerShown: false,
//         tabBarLabel: '',
//       })}
//     >
//       <Tab.Screen name="HomePage" component={HomePage} />
//       <Tab.Screen name="Search" component={Searching} />
//       <Tab.Screen name="AddProduct" component={AddProduct} />
//       <Tab.Screen name="Profile" component={Profile} />
//       <Tab.Screen name="Setting" component={Setting} />
//       <Tab.Screen name="Swiper" component={Swiper} />
//     </Tab.Navigator>
//   );
// };

// // Wrapper components for each screen with correct tab focus
// const HomeScreen = ({ navigation }) => <TabNavigator initialRoute="HomePage" navigation={navigation} />;
// const SearchScreen = ({ navigation }) => <TabNavigator initialRoute="Search" navigation={navigation} />;
// const AddProductScreen = ({ navigation }) => <TabNavigator initialRoute="AddProduct" navigation={navigation} />;
// const ProfileScreen = ({ navigation }) => <TabNavigator initialRoute="Profile" navigation={navigation} />;
// const SettingsScreen = ({ navigation }) => <TabNavigator initialRoute="Setting" navigation={navigation} />;
// const SwiperTestScreen = ({ navigation }) => <TabNavigator initialRoute="Swiper" navigation={navigation} />;

// // Drawer Navigator with all screens
// const AppNavigation = () => {
//   const [selectedTab, setSelectedTab] = useState('Home');

//   const handleTabChange = (route) => {
//     setSelectedTab(route);
//   };

//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         drawerActiveTintColor: '#ffffff',
//         drawerActiveBackgroundColor: '#6366f1',
//         headerTitle: '',
//         headerShown: true,
//       }}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: 'Home',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//           onPress: () => handleTabChange('Home'),
//         }}
//       />
//       <Drawer.Screen
//         name="Search"
//         component={SearchScreen}
//         options={{
//           title: 'Search',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="search-outline" size={size} color={color} />
//           ),
//           onPress: () => handleTabChange('Search'),
//         }}
//       />
//       <Drawer.Screen
//     name="AddProduct"
//     component={AddProductScreen}
//     options={{
//       title: 'Add Product',
//       drawerIcon: ({ color, size }) => (
//         <Ionicons name="add-circle-outline" size={size} color={color} />
//       ),
//       onPress: () => handleTabChange('AddProduct'),
//     }}
//   />
//   <Drawer.Screen
//     name="Profile"
//     component={ProfileScreen}
//     options={{
//       title: 'Profile',
//       drawerIcon: ({ color, size }) => (
//         <Ionicons name="person-outline" size={size} color={color} />
//       ),
//       onPress: () => handleTabChange('Profile'),
//     }}
//   />
//   <Drawer.Screen
//     name="Settings"
//     component={SettingsScreen}
//     options={{
//       title: 'Settings',
//       drawerIcon: ({ color, size }) => (
//         <Ionicons name="settings-outline" size={size} color={color} />
//       ),
//       onPress: () => handleTabChange('Settings'),
//     }}
//   />
//   <Drawer.Screen
//     name="SwiperTest"
//     component={SwiperTestScreen}
//     options={{
//       title: 'Swiper Test',
//       drawerIcon: ({ color, size }) => (
//         <Ionicons name="swap-horizontal-outline" size={size} color={color} />
//       ),
//       onPress: () => handleTabChange('SwiperTest'),
//     }}
//   />
// </Drawer.Navigator>
// );
// };
// const styles = StyleSheet.create({
// tabBar: {
// position: 'absolute',
// height: 80,
// borderTopWidth: 0,
// backgroundColor: '#ffffff',
// borderTopLeftRadius: 24,
// borderTopRightRadius: 24,
// paddingHorizontal: 16,
// shadowColor: '#000',
// shadowOffset: { width: 0, height: -4 },
// shadowOpacity: 0.08,
// shadowRadius: 12,
// elevation: 10,
// },
// labelStyle: {
// fontSize: 12,
// fontFamily: 'Inter-Medium',
// paddingBottom: 6,
// marginTop: -4,
// },
// });
// export default AppNavigation;





import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '../../pages/HomePage/HomePage';
import Searching from '../../pages/Searching/Searching';
import Profile from '../../pages/Profile/Profile';
import Setting from '../../pages/Setting/Setting';
import AddProduct from '../../components/AddProduct';
import Swiper from '../../components/Swiper';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Base Tab Navigator
const TabNavigator = ({ initialRoute }) => {
  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          const scaleValue = new Animated.Value(focused ? 1.2 : 1);

          switch (route.name) {
            case 'HomePage':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'AddProduct':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'SwiperTest':
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
              break;
            default:
              iconName = 'help-circle';
          }

          return (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.labelStyle,
        headerShown: false,
        tabBarLabel: '',
      })}
    >
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="Search" component={Searching} />
      <Tab.Screen name="AddProduct" component={AddProduct} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Setting} />
      <Tab.Screen name="SwiperTest" component={Swiper} />
    </Tab.Navigator>
  );
};

// Drawer Navigator
const AppNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        drawerActiveTintColor: '#ffffff',
        drawerActiveBackgroundColor: '#6366f1',
        headerTitle: '',
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="HomePage"
        component={() => <TabNavigator initialRoute="HomePage" />}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={() => <TabNavigator initialRoute="Search" />}
        options={{
          title: 'Search',
          drawerIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="AddProduct"
        component={() => <TabNavigator initialRoute="AddProduct" />}
        options={{
          title: 'Add Product',
          drawerIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={() => <TabNavigator initialRoute="Profile" />}
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={() => <TabNavigator initialRoute="Settings" />}
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="SwiperTest"
        component={() => <TabNavigator initialRoute="SwiperTest" />}
        options={{
          title: 'Swiper Test',
          drawerIcon: ({ color, size }) => <Ionicons name="swap-horizontal-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 80,
    borderTopWidth: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    paddingBottom: 6,
    marginTop: -4,
  },
});

export default AppNavigation;
