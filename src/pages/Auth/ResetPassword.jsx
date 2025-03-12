import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPassword = ({ navigation }) => {
  const [formData, setFormData] = useState({
    NewPassword: '',
    ConfirmPassword: ''
  });
  const [error, setError] = useState(''); // To manage error messages
  const { NewPassword, ConfirmPassword } = formData;

  const ReEnterpasswordInputRef = React.createRef();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isCheckValid = async () => {
    setError(''); // Clear previous error messages

    if (!NewPassword.trim() || !ConfirmPassword.trim()) {
      setError('Please enter all the details.');
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      setError('Passwords do not match. Please re-enter the passwords correctly.');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        parsedData.Password = NewPassword;

        await AsyncStorage.setItem('userData', JSON.stringify(parsedData));
        console.log('Password updated successfully');
        setError(''); // Clear any errors if password is updated successfully
        Alert.alert('Success', 'Your password has been updated.');
        navigation.navigate('Login');
      } else {
        setError('No account found. Please sign up first.');
        navigation.navigate('Signup');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('There was an issue resetting the password. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Reset Password</Text>

          {/* New Password Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>New Password</Text>
            <TextInput
              placeholder="Enter your New Password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry={true}
              value={NewPassword}
              onChangeText={(value) => handleInputChange('NewPassword', value)}
              returnKeyType="next"
              onSubmitEditing={() => ReEnterpasswordInputRef.current.focus()}
            />
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              ref={ReEnterpasswordInputRef}
              placeholder="Re-enter your New Password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry={true}
              value={ConfirmPassword}
              onChangeText={(value) => handleInputChange('ConfirmPassword', value)}
            />
          </View>

          {/* Display Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Reset Button */}
          <TouchableOpacity style={styles.button} onPress={isCheckValid}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

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
