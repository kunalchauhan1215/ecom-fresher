import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
  });

  //states to handle errors
  const [error, setError] = useState('');  
  const { Username, Email, Password } = formData;

  // Create refs for the input fields
  const emailInputRef = React.createRef();
  const passwordInputRef = React.createRef();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isCheckValid = async () => {
    setError('');  // Clear previous errors before validating

    // Validate that all fields are filled out
    if (!Username.trim() || !Email.trim() || !Password.trim()) {
      setError('Please enter all the details.');
      return; // Exit if validation fails
    }

    try {
      // Store user data in AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(formData));
      console.log('User data saved to AsyncStorage');

      // Navigate to Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
      setError('There was an issue saving your data. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior= "padding"
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Signup</Text>

          {/* Username Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              placeholder="Enter your Username"
              placeholderTextColor="gray"
              style={styles.input}
              value={Username}
              onChangeText={(value) => handleInputChange('Username', value)}
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current.focus()}  // Move to Email field
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              ref={emailInputRef} // Ref for Email input
              placeholder="Enter your Email"
              placeholderTextColor="gray"
              style={styles.input}
              value={Email}
              onChangeText={(value) => handleInputChange('Email', value)}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}  // Move to Password field
            />
          </View>

          {/* Password Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              ref={passwordInputRef} // Ref for Password input
              placeholder="Enter your Password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry={true}
              value={Password}
              onChangeText={(value) => handleInputChange('Password', value)}
              returnKeyType="done"
              onSubmitEditing={isCheckValid}  // Call the submit function
            />
          </View>

          {/* Display Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Signup Button */}
          <TouchableOpacity style={styles.button} onPress={isCheckValid}>
            <Text style={styles.buttonText}>Signup</Text>
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

export default Signup;

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
