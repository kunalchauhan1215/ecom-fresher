// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Profile = () => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Profile</Text>
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState(''); 
  const [giftCard, setGiftCard] = useState(false);
  const [giftCardDetails, setGiftCardDetails] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState({});

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const validateFields = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    let validationErrors = {};
    let isValid = true;

    // Check required fields and validation
    if (!name || !nameRegex.test(name)) {
      validationErrors.name = 'Name must not contain numbers or special characters';
      isValid = false;
    }

    if (!email || !emailRegex.test(email)) {
      validationErrors.email = 'Please enter a valid email address';
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

  const handleSaveProfile = () => {
    if (validateFields()) {
      console.log('Profile saved', { name, email, age, address, phone, gender, imageUri, giftCard, giftCardDetails });
      setIsEditing(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
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

      {isEditing && (
        <>
          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            editable={isEditing} // Email is editable only when editing
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={[styles.input, errors.phone && styles.errorInput]}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <TextInput
            style={[styles.input, errors.age && styles.errorInput]}
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

          <TextInput
            style={[styles.input, errors.address && styles.errorInput]}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <View style={styles.radioContainer}>
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
              style={styles.input}
              placeholder="Enter Gift Card Details"
              value={giftCardDetails}
              onChangeText={setGiftCardDetails}
            />
          )}
        </>
      )}

      {!isEditing && (
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

      <View style={styles.buttons}>
        <Button
          title={isEditing ? 'Save Profile' : 'Edit Profile'}
          onPress={isEditing ? handleSaveProfile : handleEditProfile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '',
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
    borderColor: '#6366f1',
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
});

export default Profile;