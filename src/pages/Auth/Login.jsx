import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const { Email, Password } = formData;

  const passwordInputRef = React.createRef();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    setEmailError('');
    setPasswordError('');
    setFormError('');

    let valid = true;

    if (!Email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    }

    if (!Password.trim()) {
      setPasswordError('Password is required.');
      valid = false;
    }

    return valid;
  };

  const isCheckValid = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Retrieve user data from AsyncStorage
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Check if Email and password match
        if (parsedData.Email === Email.trim() && parsedData.Password === Password.trim()) {
          console.log('User logged in successfully');
          navigation.navigate('Dashboard');  // Navigate to Profile screen after successful login
        } else {
          setFormError('Invalid credentials. Please check your Email or Password.');
        }
      } else {
        setFormError('No account found. Please sign up first.');
        navigation.navigate('Signup'); // Navigate to Signup screen if no account found
      }
    } catch (error) {
      console.error('Error checking user data from AsyncStorage:', error);
      setFormError('There was an issue while logging in.');
      navigation.navigate('ForgotPassword');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login</Text>

          {/* Email Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Enter your Email"
              placeholderTextColor="gray"
              style={[styles.input, emailError ? styles.inputError : null]}
              value={Email}
              onChangeText={(value) => handleInputChange('Email', value)}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}  // Focus to password field
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Password Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              ref={passwordInputRef}
              placeholder="Enter your Password"
              placeholderTextColor="gray"
              style={[styles.input, passwordError ? styles.inputError : null]}
              secureTextEntry={true}
              value={Password}
              onChangeText={(value) => handleInputChange('Password', value)}
              returnKeyType="done" // When done button is pressed, validate
              onSubmitEditing={isCheckValid}  // Trigger form validation and login on Enter
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Form Error Message */}
          {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={isCheckValid}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Don't have an account?{" "}
            <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  formErrorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  forgotPasswordText: {
    marginTop: 15,
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7F8C8D',
  },
  signupLink: {
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
});
