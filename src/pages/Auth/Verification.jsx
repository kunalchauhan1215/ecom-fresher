// // VerificationPage.js
// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import emailjs from 'emailjs-com';

// const VerificationPage = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [sentOtp, setSentOtp] = useState('');

//   // Generate random OTP (6 digits)
//   const generateOtp = () => {
//     const otpValue = Math.floor(100000 + Math.random() * 900000);
//     setSentOtp(otpValue.toString());
//     return otpValue;
//   };

//   // Send OTP via EmailJS
//   const sendOtpEmail = (otpValue) => {
//     const templateParams = {
//       to_email: email, // The recipient email
//       otp: otpValue, // The OTP value template_ru0xywf
//     };

//     emailjs
//       .send('service_leux3qj', 'template_ru0xywf', templateParams, 'FpTP505VA7prtQ6h_')
//       .then(
//         (response) => {
//           console.log('Email sent successfully:', response);
//           Alert.alert('OTP sent to your email!');
//           navigation.navigate('Otp', { otp: otpValue, email }); // Navigate to OTP input page
//         },
//         (error) => {
//           console.error('Error sending OTP email:', error);
//           Alert.alert('Error sending OTP!');
//         }
//       );
//   };

//   // Handle Send OTP button click
//   const handleSendOtp = () => {
//     if (!email) {
//       Alert.alert('Please enter a valid email.');
//       return;
//     }

//     const generatedOtp = generateOtp();
//     sendOtpEmail(generatedOtp);
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
//       />
//       <Button title="Send OTP" onPress={handleSendOtp} />
//     </View>
//   );
// };

// export default VerificationPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   message: {
//     marginTop: 20,
//     fontSize: 16,
//     color: '#9B59B6',
//   },
//   button: {
//     backgroundColor: '#9B59B6',
//     paddingVertical: 12,
//     paddingHorizontal: 60,
//     borderRadius: 8,
//     marginTop: 25,
//     elevation: 2,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
// });

