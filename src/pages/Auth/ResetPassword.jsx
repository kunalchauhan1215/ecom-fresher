import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/CustomTextInput';

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

  // Regex for Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(NewPassword)) {
    setError('Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one number.');
    return;
  }
    
    if (NewPassword !== ConfirmPassword) {
      setError('Passwords do not match. Please re-enter the passwords correctly.');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('userData');
      console.log('Stored data:', storedData);
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Reset Password</Text>

          {/* New Password Field with CustomTextInput */}
          <CustomTextInput
            label="New Password"
            placeholder="Enter your New Password"
            secureTextEntry={true}
            value={NewPassword}
            onChangeText={(value) => handleInputChange('NewPassword', value)}
            error={error.includes('New Password') ? error : null}
            returnKeyType="next"
            onSubmitEditing={() => ReEnterpasswordInputRef.current.focus()}
          />

          {/* Confirm Password Field with CustomTextInput */}
          <CustomTextInput
            label="Confirm Password"
            placeholder="Re-enter your New Password"
            secureTextEntry={true}
            value={ConfirmPassword}
            onChangeText={(value) => handleInputChange('ConfirmPassword', value)}
            error={error.includes('Confirm Password') ? error : null}
            inputRef={ReEnterpasswordInputRef}
            returnKeyType="done"
            onSubmitEditing={isCheckValid}
          />

          {/* Display Error Message */}
          {error && !error.includes('New Password') && !error.includes('Confirm Password') && (
            <Text style={styles.errorText}>{error}</Text>
          )}

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
