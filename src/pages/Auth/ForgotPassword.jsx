import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/CustomTextInput';

const ForgotPassword = ({ navigation }) => {
  const [formData, setFormData] = useState({
    Email: '',
    OldPassword: ''
  });
  const [error, setError] = useState(''); // To manage error messages
  const { Email, OldPassword } = formData;

  const passwordInputRef = React.createRef();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isCheckValid = async () => {
    console.log('Validating form...');
    if (!Email.trim() || !OldPassword.trim()) {
      setError('Please Enter All the Details');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Check if the email matches the stored email
        if (parsedData.Email === Email) {
          // Check if the old password matches
          if (parsedData.Password === OldPassword) {
            console.log('Password matches, proceeding to login...');
            navigation.navigate('Login');
          } else {
            console.log('Old password incorrect, redirecting to ResetPassword...');
            navigation.navigate('ResetPassword');
          }
        } else {
          setError('No account found with this email. Please check your email.');
        }
      } else {
        setError('No account found. Please sign up first.');
        navigation.navigate('Signup');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      setError('There was an issue with the process. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Forgot Password</Text>

        {/* Email Field with CustomTextInput */}
        <CustomTextInput
          label="Email"
          placeholder="Enter your Email"
          value={Email}
          onChangeText={(value) => handleInputChange('Email', value)}
          error={error.includes('Email') ? error : null}
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current.focus()}
        />

        {/* Old Password Field with CustomTextInput */}
        <CustomTextInput
          label="Old Password"
          placeholder="Enter your Old Password"
          secureTextEntry={true}
          value={OldPassword}
          onChangeText={(value) => handleInputChange('OldPassword', value)}
          error={error.includes('Old Password') ? error : null}
          inputRef={passwordInputRef}
          returnKeyType="done"
          onSubmitEditing={isCheckValid}

        />

        {/* Display Error Message */}
        {error && !error.includes('Email') && !error.includes('Old Password') && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={isCheckValid}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5D9F2',
  },
  innerContainer: {
    width: '90%',
    padding: 25,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#6A0DAD',
    marginBottom: 40,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7F8C8D',
  },
  loginLink: {
    color: '#9B59B6',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#9B59B6',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 25,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  errorText: {
    color: 'red',  // Red color for error message
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
