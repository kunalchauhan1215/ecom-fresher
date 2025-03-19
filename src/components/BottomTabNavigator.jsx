

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StyleSheet, Animated } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Home from '../pages/home/Home';
// import Searching from '../pages/home/Searching';
// import Profile from '../pages/home/Profile';
// import Settings from '../pages/home/Settings';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
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
//             case 'Profile':
//               iconName = focused ? 'person' : 'person-outline';
//               break;
//             case 'Settings':
//               iconName = focused ? 'settings' : 'settings-outline';
//               break;
//               case 'AddProducts':
//               iconName = focused ? 'add' : 'add-outline';
//               break;
//             default:
//               iconName = 'help-circle';
//           }

//           return (
//             <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
//               <Ionicons
//                 name={iconName}
//                 size={focused ? 28 : 24}
//                 color={color}
//               />
//             </Animated.View>
//           );
//         },
//         tabBarActiveTintColor: '#6366f1',  // Modern indigo color
//         tabBarInactiveTintColor: '#64748b', // Slate color
//         tabBarStyle: styles.tabBar,
//         tabBarLabelStyle: styles.labelStyle,
//         headerShown: true,
//         tabBarHideOnKeyboard: false,
//       })}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{ tabBarLabel: '' }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={Searching}
//         options={{ tabBarLabel: '' }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{ tabBarLabel: '' }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={Settings}
//         options={{ tabBarLabel: '' }}
//       />
//     </Tab.Navigator>
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
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default BottomTabNavigator;




import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../pages/home/Home';
import Searching from '../pages/home/Searching';
import Profile from '../pages/home/Profile';
import Settings from '../pages/home/Settings';
import AddProduct from '../pages/home/AddProduct'; // Import the new AddProducts component

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'AddProduct':
              iconName = focused ? 'add-circle' : 'add-circle-outline'; // Icon for Add Products
              break;
            default:
              iconName = 'help-circle';
          }

          return (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons
                name={iconName}
                size={focused ? 28 : 24}
                color={color}
              />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: '#6366f1',  // Modern indigo color
        tabBarInactiveTintColor: '#64748b', // Slate color
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.labelStyle,
        headerShown: true,
        tabBarHideOnKeyboard: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="Search"
        component={Searching}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProduct} // Add the new AddProducts screen
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: '' }}
      />
    </Tab.Navigator>
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;

