// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, Button, Alert, ActivityIndicator } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';

// const Profile = ({ route }) => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state

//   const selectImageFromGallery = () => {
//     setLoading(true); 
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         includeBase64: false,
//         quality: 0.8, 
//       },
//       (response) => {
//         setLoading(false); 
//         if (response.didCancel) {
//           console.log('User  cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//           Alert.alert('Error', 'ImagePicker Error: ' + response.error);
//         } else if (response.assets) {
//           setProfileImage(response.assets[0].uri); 
//         }
//       }
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile</Text>
//       <View style={styles.card}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : profileImage ? (
//           <Image source={{ uri: profileImage }} style={styles.profileImage} />
//         ) : (
//           <Text>No image selected</Text>
//         )}
//         <Text style={styles.cardText}>Image Selected</Text>
//       </View>
      
//       <Button title="Choose Image from Gallery" onPress={selectImageFromGallery} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'white',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50, // Makes the image circular
//     marginBottom: 10,
//   },
//   card: {
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   cardText: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Profile;
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');

  const [isEditing, setIsEditing] = useState(true);

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSaveProfile = () => {
    // Here, you would typically save the data to a database or API
    console.log('Profile saved', { name, bio, preferences, imageUri });
    setIsEditing(false);
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
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        
      
       
          
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
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttons: {
    width: '80%',
    marginTop: 20,
  },
});

export default Profile;
