// Signup.jsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/CustomTextInput';

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
  });

  const [error, setError] = useState('');
  const { Username, Email, Password } = formData;

  const emailInputRef = React.createRef();
  const passwordInputRef = React.createRef();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isCheckValid = async () => {
    setError('');

    if (!Username.trim() || !Email.trim() || !Password.trim()) {
      setError('Please enter all the details.');
      return;
    }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
  if (!emailRegex.test(Email)) {
    setError('Please enter a valid email address.');
    return;
  }

  // Regex for Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(Password)) {
    setError('Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one number.');
    return;
  }

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(formData));
      console.log('User data saved to AsyncStorage');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
      setError('There was an issue saving your data. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Signup</Text>

          <CustomTextInput
            label="Username"
            value={Username}
            onChangeText={(value) => handleInputChange('Username', value)}
            placeholder="Enter your Username"
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current.focus()}
          />

          <CustomTextInput
            label="Email"
            value={Email}
            onChangeText={(value) => handleInputChange('Email', value)}
            placeholder="Enter your Email"
            returnKeyType="next"
            inputRef={emailInputRef}
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />

          <CustomTextInput
            label="Password"
            value={Password}
            onChangeText={(value) => handleInputChange('Password', value)}
            placeholder="Enter your Password"
            secureTextEntry={true}
            inputRef={passwordInputRef}
            returnKeyType="done"
            onSubmitEditing={isCheckValid}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

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
    backgroundColor: '#E5D9F2',
  },
  innerContainer: {
    width: '90%',
    padding: 25,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    backgroundColor: '#ffffff',
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
    color: '#FF6347',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
