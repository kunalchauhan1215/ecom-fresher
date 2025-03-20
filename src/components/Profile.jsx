import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [giftCard, setGiftCard] = useState(false);
  const [giftCardDetails, setGiftCardDetails] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState({});

  
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const giftCardDetailsInputRef = useRef(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const validateFields = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    let validationErrors = {};
    let isValid = true;

    if (!name || !nameRegex.test(name)) {
      validationErrors.name = 'Name must not contain numbers or special characters';
      isValid = false;
    }

    if (!email || !emailRegex.test(email)) {
      validationErrors.email = 'Please enter a valid Gmail address';
      isValid = false;
    }

    if (!phone || !phoneRegex.test(phone)) {
      validationErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!age || isNaN(age) || age <= 0) {
      validationErrors.age = 'Please enter a valid age';
      isValid = false;
    }

    if (!address) {
      validationErrors.address = 'Address is required';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const saveProfile = async () => {
    if (validateFields()) {
      const profileData = {
        name,
        email,
        age,
        address,
        phone,
        gender,
        imageUri,
        giftCard,
        giftCardDetails,
      };

      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
        Alert.alert('Success', 'Profile saved successfully!');
        setIsEditing(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to save profile. Please try again.');
      }
    }
  };

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setName(profile.name);
        setEmail(profile.email);
        setAge(profile.age);
        setAddress(profile.address);
        setPhone(profile.phone);
        setGender(profile.gender);
        setImageUri(profile.imageUri);
        setGiftCard(profile.giftCard);
        setGiftCardDetails(profile.giftCardDetails);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logging out', 'Are you sure you want to log out?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          // await AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  // Function to handle moving to the next input
  const handleNextInput = (nextInputRef) => {
    if (nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isEditing ? 'Edit Profile' : 'Profile'}</Text>

      <TouchableOpacity onPress={handleImagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {isEditing ? (
        <>
          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => handleNextInput(emailInputRef)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            ref={emailInputRef}
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => handleNextInput(phoneInputRef)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            ref={phoneInputRef}
            style={[styles.input, errors.phone && styles.errorInput]}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            onSubmitEditing={() => handleNextInput(ageInputRef)}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <TextInput
            ref={ageInputRef}
            style={[styles.input, errors.age && styles.errorInput]}
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            onSubmitEditing={() => handleNextInput(addressInputRef)}
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

          <TextInput
            ref={addressInputRef}
            style={[styles.input, errors.address && styles.errorInput]}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
            onSubmitEditing={() => handleNextInput(giftCardDetailsInputRef)}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <View style={styles.genderContainer}>
            <Text>Gender:</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setGender('Male')}>
                <Text style={gender === 'Male' ? styles.selectedRadio : styles.radio}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGender('Female')}>
                <Text style={gender === 'Female' ? styles.selectedRadio : styles.radio}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGender('Other')}>
                <Text style={gender === 'Other' ? styles.selectedRadio : styles.radio}>Other</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <Text>Gift Card?</Text>
            <TouchableOpacity onPress={() => setGiftCard(!giftCard)}>
              <Text style={styles.radio}>{giftCard ? 'Yes' : 'No'}</Text>
            </TouchableOpacity>
          </View>

          {giftCard && (
            <TextInput
              ref={giftCardDetailsInputRef}
              style={styles.input}
              placeholder="Enter Gift Card Details"
              value={giftCardDetails}
              onChangeText={setGiftCardDetails}
            />
          )}
        </>
      ) : (
        <>
          <Text style={styles.infoText}>Name: {name}</Text>
          <Text style={styles.infoText}>Email: {email}</Text>
          <Text style={styles.infoText}>Phone: {phone}</Text>
          <Text style={styles.infoText}>Age: {age}</Text>
          <Text style={styles.infoText}>Address: {address}</Text>
          <Text style={styles.infoText}>Gender: {gender}</Text>
          <Text style={styles.infoText}>Gift Card: {giftCard ? giftCardDetails : 'No'}</Text>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={isEditing ? saveProfile : () => setIsEditing(true)}>
        <Text style={styles.buttonText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  buttons: {
    width: '80%',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
  radioContainer: {
    marginTop: 10,
  },
  genderContainer: {
    flexDirection: 'column',
    marginVertical: 15,
    width: '80%',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },
  radio: {
    marginHorizontal: 10,
  },
  selectedRadio: {
    fontWeight: 'bold',
    color: 'blue',
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  savedButton: {
    backgroundColor: '#6366f1', // Green color for the saved button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#6366f1',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;