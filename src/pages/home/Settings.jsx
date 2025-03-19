// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const Settings = () => {
//     const navigation = useNavigation();
//     const handleHome = () => {
//         navigation.navigate('Profile')
//     }
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={handleHome}>
//                 <Text style={styles.text}>Settings</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//     },
// });

// export default Settings;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Button, List, DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    primary: '#6200ee',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    accent:"purple"
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme,
    primary: '#bb86fc',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    accent:"purple"
  },
};

const Setting = () => {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
  const navigation = useNavigation();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'dark') {
          setTheme(darkTheme);
          setIsDarkMode(true);
        } else {
          setTheme(lightTheme);
          setIsDarkMode(false);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        setTheme(lightTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleNotifications = () => setNotificationsEnabled(!isNotificationsEnabled);

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? lightTheme : darkTheme;
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);

    try {
      await AsyncStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  if (!theme || !theme.colors) {
    return <Text>Loading...</Text>;
  }

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      

 
        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="User Profile"
          description="View and edit your personal details"
          left={() => <List.Icon icon="account" color={theme.colors.text} />}
          onPress={() => navigation.navigate('Profile')}/>

        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="Orders"
          description="View your past orders"
          left={() => <List.Icon icon="shopping" color={theme.colors.text} />}
          onPress={() => navigation.navigate('Orders')}/>

        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="Saved Addresses"
          description="Manage your shipping addresses"
          left={() => <List.Icon icon="map-marker" color={theme.colors.text} />}
          onPress={() => navigation.navigate('Addresses')}/>

        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="Refunds"
          description="Check the status of your refunds"
          left={() => <List.Icon icon="currency-usd" color={theme.colors.text} />}
          onPress={() => navigation.navigate('Refunds')}/>

        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="Rewards"
          description="View your reward points and discounts"
          left={() => <List.Icon icon="star" color={theme.colors.text} />}
          onPress={() => navigation.navigate('Rewards')} />

        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="Customer Support"
          description="Contact us for help"
          left={() => <List.Icon icon="headset" color={theme.colors.text} />}
          onPress={() => navigation.navigate('CustomerSupport')}/>

        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="FAQ"
          description="Frequently asked questions"
          left={() => <List.Icon icon="help-circle" color={theme.colors.text} />}
          onPress={() => navigation.navigate('FAQ')}/>

        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="Suggested Products"
          description="View recommended products for you"
          left={() => <List.Icon icon="lightbulb-on" color={theme.colors.text} />}
          onPress={() => navigation.navigate('SuggestedProducts')} />

        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: theme.colors.text }]}>Enable Notifications</Text>
          <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications}/>
        </View>

        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: theme.colors.text }]}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme}/>
        </View>

        <List.Item
          titleStyle={{ color: theme.colors.text }}
          descriptionStyle={{ color: theme.colors.text }}
          title="General Info"
          description="Privacy Policy, Terms & Conditions"
          left={() => <List.Icon icon="information" color={theme.colors.text} />}
          onPress={() => navigation.navigate('GeneralInfo')}/>

        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: theme.colors.accent}]}
          labelStyle={{ color: theme.colors.text }} >
          Logout
        </Button>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
    flex: 1,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 140, // Increase this value
  },
});

export default Setting;
