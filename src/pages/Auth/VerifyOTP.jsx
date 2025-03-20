// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

// const VerifyOTP = ({ route, navigation }) => {
//   const { otp: sentOtp, email } = route.params;  // Receive the OTP and email from the previous screen
//   const [otp, setOtp] = useState('');  // OTP entered by the user

//   // Handle OTP verification
//   const verifyOtp = () => {
//     if (otp === sentOtp) {
//       // OTP matches, navigate to the dashboard
//       Alert.alert('OTP verified successfully!');
//       navigation.navigate('Dashboard');  // Navigate to the Dashboard page
//     } else {
//       // OTP doesn't match
//       Alert.alert('Invalid OTP! Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter OTP</Text>
//       <Text style={styles.subtitle}>An OTP has been sent to {email}</Text>

//       <TextInput
//         placeholder="Enter OTP"
//         value={otp}
//         onChangeText={setOtp}
//         style={styles.input}
//         keyboardType="numeric"
//       />

//       <Button title="Verify OTP" onPress={verifyOtp} />
//     </View>
//   );
// };

// export default VerifyOTP;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: 'gray',
//   },
//   input: {
//     padding: 10,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     width: '80%',
//     borderRadius: 5,
//     textAlign: 'center',
//   },
// });
