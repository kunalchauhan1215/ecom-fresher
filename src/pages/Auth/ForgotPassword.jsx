import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    setError(''); // Clear previous error messages
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
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Forgot Password</Text>

          {/* Email Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Enter your Email"
              placeholderTextColor="gray"
              style={styles.input}
              value={Email}
              onChangeText={(value) => handleInputChange('Email', value)}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
          </View>

          {/* Old Password Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Old Password</Text>
            <TextInput
              ref={passwordInputRef} 
              placeholder="Enter your Old Password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry={true}
              value={OldPassword}
              onChangeText={(value) => handleInputChange('OldPassword', value)}
            />
          </View>

          {/* Display Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F6',
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
    color: '#2C3E50',
    marginBottom: 40,
  },
  inputField: {
    marginVertical: 12,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    color: '#2C3E50',
  },
  input: {
    borderBottomColor: '#2980B9',
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginTop: 5,
    fontSize: 16,
    color: '#2C3E50',
    textAlignVertical: 'center',
    letterSpacing: 0.5,
    paddingHorizontal: 8,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7F8C8D',
  },
  loginLink: {
    color: '#2980B9',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2980B9',
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

