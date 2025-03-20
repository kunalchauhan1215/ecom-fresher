// Login.jsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/CustomTextInput';

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
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        if (parsedData.Email === Email.trim() && parsedData.Password === Password.trim()) {
          console.log('User logged in successfully');
          navigation.navigate('Dashboard');
        } else {
          setFormError('Invalid credentials. Please check your Email or Password.');
        }
      } else {
        setFormError('No account found. Please sign up first.');
        navigation.navigate('Signup');
      }
    } catch (error) {
      console.error('Error checking user data from AsyncStorage:', error);
      setFormError('There was an issue while logging in.');
      navigation.navigate('ForgotPassword');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login</Text>

          <CustomTextInput
            label="Email"
            value={Email}
            onChangeText={(value) => handleInputChange('Email', value)}
            error={emailError}
            placeholder="Enter your Email"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />

          <CustomTextInput
            label="Password"
            value={Password}
            onChangeText={(value) => handleInputChange('Password', value)}
            error={passwordError}
            placeholder="Enter your Password"
            secureTextEntry={true}
            inputRef={passwordInputRef}
            returnKeyType="done"
            onSubmitEditing={isCheckValid}
          />

          {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={isCheckValid}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
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
  formErrorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  forgotPasswordText: {
    marginTop: 15,
    color: '#9B59B6',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7F8C8D',
  },
  signupLink: {
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
});
