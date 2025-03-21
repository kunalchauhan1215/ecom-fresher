

import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../pages/home/Home';
import Searching from '../../pages/home/Searching';
import Profile from '../../pages/home/Profile';
import Settings from '../../pages/home/Settings';
import AddProduct from '../../pages/home/AddProduct';
import SwiperTest from '../../pages/home/SwiperTest';
import { useSelector } from 'react-redux';
import Cart from '../../pages/cartPage/Cart';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Base Tab Navigator that will be used across all screens
const TabNavigator = ({ initialRoute, navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          const scaleValue = new Animated.Value(1);

          if (focused) {
            Animated.spring(scaleValue, {
              toValue: 1.2,
              friction: 3,
              useNativeDriver: true,
            }).start();
          } else {
            scaleValue.setValue(1);
          }

          switch (route.name) {
            case 'Home':
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Searching} />
      <Tab.Screen name="AddProduct" component={AddProduct} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="SwiperTest" component={SwiperTest} />
    </Tab.Navigator>
  );
};

// Wrapper components for each screen with correct tab focus
const HomeScreen = ({ navigation }) => <TabNavigator initialRoute="Home" navigation={navigation} />;
const SearchScreen = ({ navigation }) => <TabNavigator initialRoute="Search" navigation={navigation} />;
const AddProductScreen = ({ navigation }) => <TabNavigator initialRoute="AddProduct" navigation={navigation} />;
const ProfileScreen = ({ navigation }) => <TabNavigator initialRoute="Profile" navigation={navigation} />;
const SettingsScreen = ({ navigation }) => <TabNavigator initialRoute="Settings" navigation={navigation} />;
const SwiperTestScreen = ({ navigation }) => <TabNavigator initialRoute="SwiperTest" navigation={navigation} />;

// Drawer Navigator with all screens
const AppNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const cartData = useSelector(state => state.cart?.cart);

  const getTotalQuantity = () => {
    let total = 0;
    cartData.map(item => {
      total = total + item.quantity;
    });
    return total;
  };

  const handleTabChange = (route) => {
    setSelectedTab(route);
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        // Customizing the drawer options
        drawerActiveTintColor: '#ffffff', 
        drawerActiveBackgroundColor: '#6366f1', 
        headerTitle: '',
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity 
          style={styles.cartContainer} 
          onPress={() => navigation.navigate('cart')}
        >
          <Image
            style={styles.cartImage}
            source={require('../../assets/icons/shopping-cart.png')}
          />
          {getTotalQuantity() > 0 && (
            <Text style={styles.cartQuantity}>{getTotalQuantity()}</Text>
          )}
        </TouchableOpacity>
        ),
      })}
    //   screenOptions={{
    //     drawerActiveTintColor: '#ffffff', 
    //     drawerActiveBackgroundColor: '#6366f1', 
    //     headerTitle: '',
    //     headerShown: true,
    //   }
    // }
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          onPress: () => handleTabChange('Home'),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
          onPress: () => handleTabChange('Search'),
        }}
      />
      <Drawer.Screen
    name="AddProduct"
    component={AddProductScreen}
    options={{
      title: 'Add Product',
      drawerIcon: ({ color, size }) => (
        <Ionicons name="add-circle-outline" size={size} color={color} />
      ),
      onPress: () => handleTabChange('AddProduct'),
    }}
  />
  <Drawer.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      title: 'Profile',
      drawerIcon: ({ color, size }) => (
        <Ionicons name="person-outline" size={size} color={color} />
      ),
      onPress: () => handleTabChange('Profile'),
    }}
  />
  <Drawer.Screen
    name="Settings"
    component={SettingsScreen}
    options={{
      title: 'Settings',
      drawerIcon: ({ color, size }) => (
        <Ionicons name="settings-outline" size={size} color={color} />
      ),
      onPress: () => handleTabChange('Settings'),
    }}
  />
  <Drawer.Screen
    name="SwiperTest"
    component={SwiperTestScreen}
    options={{
      title: 'Swiper Test',
      drawerIcon: ({ color, size }) => (
        <Ionicons name="swap-horizontal-outline" size={size} color={color} />
      ),
      onPress: () => handleTabChange('SwiperTest'),
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
cartContainer: {
  marginRight: 30,  // Moves the icon away from the edge
  position: 'relative',  // Keeps the quantity number positioned correctly
},
cartImage: {
  width: 30,
  height: 30,
  tintColor: '#800080', // Adjust icon color if needed
},
cartQuantity: {
  position: 'absolute',
  top: -5,
  right: -5,
  backgroundColor: 'red',
  color: 'white',
  borderRadius: 10,
  width: 18,
  height: 18,
  textAlign: 'center',
  fontSize: 12,
  fontWeight: 'bold',
},
});
export default AppNavigation;




// import React, { useState, useEffect } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Animated, StyleSheet, View } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Home from '../../pages/home/Home';
// import Searching from '../../pages/home/Searching';
// import Profile from '../../pages/home/Profile';
// import Settings from '../../pages/home/Settings';
// import AddProduct from '../../pages/home/AddProduct';
// import SwiperTest from '../../pages/home/SwiperTest';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// // Create a context to share navigation state
// import { createContext, useContext } from 'react';
// const NavigationSyncContext = createContext();

// // Tab Navigator with sync capability - without SwiperTest
// const TabNavigator = ({ navigation, initialRoute, showTabs = true }) => {
//   const { currentRoute, setCurrentRoute } = useContext(NavigationSyncContext);
  
//   // Configure which route to show initially
//   const actualInitialRoute = initialRoute || currentRoute;
  
//   return (
//     <Tab.Navigator
//       initialRouteName={actualInitialRoute === 'SwiperTest' ? 'Home' : actualInitialRoute}
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
//         tabBarHideOnKeyboard: true,
//       })}
//       screenListeners={{
//         tabPress: (e) => {
//           // Update current route when tab is pressed
//           const routeName = e.target.split('-')[0];
//           setCurrentRoute(routeName);
//           navigation.navigate(routeName);
//         },
//       }}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Search" component={Searching} />
//       <Tab.Screen name="AddProduct" component={AddProduct} />
//       <Tab.Screen name="Profile" component={Profile} />
//       <Tab.Screen name="Settings" component={Settings} />
//     </Tab.Navigator>
//   );
// };

// // Special screen for SwiperTest that still shows the bottom tabs
// const SwiperTestWithTabs = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <SwiperTest />
//       <TabNavigator navigation={navigation} initialRoute="Home" />
//     </View>
//   );
// };

// // Wrapper components for each screen with correct tab focus
// const HomeScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('Home');
//   }, []);
//   return <TabNavigator initialRoute="Home" navigation={navigation} />;
// };

// const SearchScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('Search');
//   }, []);
//   return <TabNavigator initialRoute="Search" navigation={navigation} />;
// };

// const AddProductScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('AddProduct');
//   }, []);
//   return <TabNavigator initialRoute="AddProduct" navigation={navigation} />;
// };

// const ProfileScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('Profile');
//   }, []);
//   return <TabNavigator initialRoute="Profile" navigation={navigation} />;
// };

// const SettingsScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('Settings');
//   }, []);
//   return <TabNavigator initialRoute="Settings" navigation={navigation} />;
// };

// // Special screen for SwiperTest
// const SwiperTestScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('SwiperTest');
//   }, []);
//   return <SwiperTest />;
// };

// // Drawer Navigator with all screens
// const AppNavigation = () => {
//   const [currentRoute, setCurrentRoute] = useState('Home');

//   const handleTabChange = (route) => {
//     setCurrentRoute(route);
//   };

//   return (
//     <NavigationSyncContext.Provider value={{ currentRoute, setCurrentRoute }}>
//       <Drawer.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           drawerActiveTintColor: '#800080', 
//           drawerActiveBackgroundColor: '#E6CCE6', 
//           headerTitle: '',
//           headerShown: true,
//         }}
//       >
//         <Drawer.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             title: 'Home',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="home-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => handleTabChange('Home'),
//           }}
//         />
//         <Drawer.Screen
//           name="Search"
//           component={SearchScreen}
//           options={{
//             title: 'Search',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="search-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => handleTabChange('Search'),
//           }}
//         />
//         <Drawer.Screen
//           name="AddProduct"
//           component={AddProductScreen}
//           options={{
//             title: 'Add Product',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="add-circle-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => handleTabChange('AddProduct'),
//           }}
//         />
//         <Drawer.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             title: 'Profile',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="person-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => handleTabChange('Profile'),
//           }}
//         />
//         <Drawer.Screen
//           name="Settings"
//           component={SettingsScreen}
//           options={{
//             title: 'Settings',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="settings-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => handleTabChange('Settings'),
//           }}
//         />
//         <Drawer.Screen
//           name="SwiperTest"
//           component={SwiperTestScreen}
//           options={{
//             title: 'Swiper Test',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="swap-horizontal-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => handleTabChange('SwiperTest'),
//           }}
//         />
//       </Drawer.Navigator>
//     </NavigationSyncContext.Provider>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     position: 'absolute',
//     height: 80,
//     borderTopWidth: 0,
//     backgroundColor: '#ffffff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 10,
//   },
//   labelStyle: {
//     fontSize: 12,
//     fontFamily: 'Inter-Medium',
//     paddingBottom: 6,
//     marginTop: -4,
//   },
// });

// export default AppNavigation;





// import React, { useState, useEffect } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Animated, StyleSheet, View } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Home from '../../pages/home/Home';
// import Searching from '../../pages/home/Searching';
// import Profile from '../../pages/home/Profile';
// import Settings from '../../pages/home/Settings';
// import AddProduct from '../../pages/home/AddProduct';
// import SwiperTest from '../../pages/home/SwiperTest';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// // Create a context to share navigation state
// import { createContext, useContext } from 'react';
// const NavigationSyncContext = createContext();

// // Tab Navigator with sync capability - without SwiperTest
// const TabNavigator = ({ navigation, initialRoute }) => {
//   const { currentRoute, setCurrentRoute } = useContext(NavigationSyncContext);
  
//   // Configure which route to show initially
//   const actualInitialRoute = initialRoute || currentRoute;
  
//   return (
//     <Tab.Navigator
//       initialRouteName={actualInitialRoute}
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
//         tabBarHideOnKeyboard: true,
//       })}
//       screenListeners={{
//         tabPress: (e) => {
//           // Update current route when tab is pressed
//           const routeName = e.target.split('-')[0];
//           setCurrentRoute(routeName);
//           // Also ensure drawer highlight updates
//           navigation.navigate(routeName);
//         },
//       }}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Search" component={Searching} />
//       <Tab.Screen name="AddProduct" component={AddProduct} />
//       <Tab.Screen name="Profile" component={Profile} />
//       <Tab.Screen name="Settings" component={Settings} />
//     </Tab.Navigator>
//   );
// };

// // Wrapper components for each screen with correct tab focus
// const HomeScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('Home');
//   }, []);
//   return <TabNavigator initialRoute="Home" navigation={navigation} />;
// };

// const SearchScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('Search');
//   }, []);
//   return <TabNavigator initialRoute="Search" navigation={navigation} />;
// };

// const AddProductScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('AddProduct');
//   }, []);
//   return <TabNavigator initialRoute="AddProduct" navigation={navigation} />;
// };

// const ProfileScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('Profile');
//   }, []);
//   return <TabNavigator initialRoute="Profile" navigation={navigation} />;
// };

// const SettingsScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
//   useEffect(() => {
//     setCurrentRoute('Settings');
//   }, []);
//   return <TabNavigator initialRoute="Settings" navigation={navigation} />;
// };

// // Pure SwiperTest screen - NO tab navigator
// const SwiperTestScreen = ({ navigation }) => {
//   const { setCurrentRoute } = useContext(NavigationSyncContext);
  
//   useEffect(() => {
//     setCurrentRoute('SwiperTest');
//   }, []);
  
//   return (
//     <View style={{ flex: 1 }}>
//       <SwiperTest />
//     </View>
//   );
// };

// // Main App Navigation
// const AppNavigation = () => {
//   const [currentRoute, setCurrentRoute] = useState('Home');

//   return (
//     <NavigationSyncContext.Provider value={{ currentRoute, setCurrentRoute }}>
//       <Drawer.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           drawerActiveTintColor: '#800080', 
//           drawerActiveBackgroundColor: '#E6CCE6', 
//           headerTitle: '',
//           headerShown: true,
//         }}
//       >
//         <Drawer.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             title: 'Home',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="home-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => setCurrentRoute('Home'),
//           }}
//         />
//         <Drawer.Screen
//           name="Search"
//           component={SearchScreen}
//           options={{
//             title: 'Search',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="search-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => setCurrentRoute('Search'),
//           }}
//         />
//         <Drawer.Screen
//           name="AddProduct"
//           component={AddProductScreen}
//           options={{
//             title: 'Add Product',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="add-circle-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => setCurrentRoute('AddProduct'),
//           }}
//         />
//         <Drawer.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             title: 'Profile',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="person-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => setCurrentRoute('Profile'),
//           }}
//         />
//         <Drawer.Screen
//           name="Settings"
//           component={SettingsScreen}
//           options={{
//             title: 'Settings',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="settings-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => setCurrentRoute('Settings'),
//           }}
//         />
//         <Drawer.Screen
//           name="SwiperTest"
//           component={SwiperTestScreen}
//           options={{
//             title: 'Swiper Test',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="swap-horizontal-outline" size={size} color={color} />
//             ),
//           }}
//           listeners={{
//             focus: () => setCurrentRoute('SwiperTest'),
//           }}
//         />
//       </Drawer.Navigator>
//     </NavigationSyncContext.Provider>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     position: 'absolute',
//     height: 80,
//     borderTopWidth: 0,
//     backgroundColor: '#ffffff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 10,
//   },
//   labelStyle: {
//     fontSize: 12,
//     fontFamily: 'Inter-Medium',
//     paddingBottom: 6,
//     marginTop: -4,
//   },
// });

// export default AppNavigation;