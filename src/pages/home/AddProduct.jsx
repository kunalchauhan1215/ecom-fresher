  


// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, TextInput, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
// import * as ImagePicker from "react-native-image-picker";

// const AddProduct = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [rating, setRating] = useState("");
//   const [brand, setBrand] = useState("");
//   const [sku, setSku] = useState("");
//   const [warranty, setWarranty] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [imageUri, setImageUri] = useState("");

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary(
//       { mediaType: "photo", quality: 1 },
//       (response) => {
//         if (response.didCancel) {
//           Alert.alert("Cancelled", "Image selection cancelled.");
//         } else if (response.errorMessage) {
//           Alert.alert("Error", response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           setImageUri(response.assets[0].uri);
//         }
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = new FormData();
//     newProduct.append('title', title);
//     newProduct.append('description', description);
//     newProduct.append('category', category);
//     newProduct.append('price', parseFloat(price));
//     newProduct.append('stock', parseInt(stock));
//     newProduct.append('rating', parseFloat(rating));
//     newProduct.append('brand', brand);
//     newProduct.append('sku', sku);
//     newProduct.append('warrantyInformation', warranty);
//     newProduct.append('availabilityStatus', availability);

//     if (imageUri) {
//       newProduct.append('thumbnail', {
//         uri: imageUri,
//         type: 'image/jpeg', // or the appropriate type for your image
//         name: 'product-image.jpg', // or any name you want to give it
//       });
//     }

//     try {
//       const response = await fetch("http://localhost:3000/products", {
//         method: "POST",
//         body: newProduct,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert("Success", "Product added successfully!");

//         // Clear form
//         setTitle("");
//         setDescription("");
//         setCategory("");
//         setPrice("");
//         setStock("");
//         setRating("");
//         setBrand("");
//         setSku("");
//         setWarranty("");
//         setAvailability("");
//         setImageUri("");
//       } else {
//         Alert.alert("Error", data.message || "Failed to add product.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to add product.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       {/* Add Product Button at the Top */}
//       <Button title="Add Product" onPress={handleSubmit} />

//       <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
//       <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
//       <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
//       <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
//       <TextInput style={styles.input} placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
//       <TextInput style={styles.input} placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" />
//       <TextInput style={styles.input} placeholder="Brand" value={brand} onChangeText={setBrand} />
//       <TextInput style={styles.input} placeholder="SKU" value={sku} onChangeText={setSku} />
//       <TextInput style={styles.input} placeholder="Warranty Info" value={warranty} onChangeText={setWarranty} />
//       <TextInput style={styles.input} placeholder="Availability Status" value={availability} onChangeText={setAvailability} />

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {imageUri ? <Image source={{ uri: imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     borderRadius: 5,
//     backgroundColor: "#fff",
//   },
//   imagePicker: {
//     backgroundColor: "#6200ee",
//     padding: 10,
//     alignItems: "center",
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   imagePickerText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   previewImage: {
//     width: 100,
//     height: 100,
//     alignSelf: "center",
//     marginBottom: 10,
//   },
// });

// export default AddProduct;

// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, TextInput, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
// import * as ImagePicker from "react-native-image-picker";

// const AddProduct = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [rating, setRating] = useState("");
//   const [brand, setBrand] = useState("");
//   const [sku, setSku] = useState("");
//   const [warranty, setWarranty] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [imageUri, setImageUri] = useState("");

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary(
//       { mediaType: "photo", quality: 1 },
//       (response) => {
//         if (response.didCancel) {
//           Alert.alert("Cancelled", "Image selection cancelled.");
//         } else if (response.errorMessage) {
//           Alert.alert("Error", response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           setImageUri(response.assets[0].uri);
//         }
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = new FormData();
//     newProduct.append('title', title);
//     newProduct.append('description', description);
//     newProduct.append('category', category);
//     newProduct.append('price', parseFloat(price));
//     newProduct.append('stock', parseInt(stock));
//     newProduct.append('rating', parseFloat(rating));
//     newProduct.append('brand', brand);
//     newProduct.append('sku', sku);
//     newProduct.append('warrantyInformation', warranty);
//     newProduct.append('availabilityStatus', availability);

//     if (imageUri) {
//       newProduct.append('thumbnail', {
//         uri: imageUri,
//         type: 'image/jpeg', // Ensure this matches the image type
//         name: 'product-image.jpg',
//       });
//     }

//     try {
//       const response = await fetch("http://localhost:3000/products", {
//         method: "POST",
//         body: newProduct,
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add product.");
//       }

//       const data = await response.json();
//       console.log("Response data:", data);
//       Alert.alert("Success", "Product added successfully!");

//       // Clear form
//       setTitle("");
//       setDescription("");
//       setCategory("");
//       setPrice("");
//       setStock("");
//       setRating("");
//       setBrand("");
//       setSku("");
//       setWarranty("");
//       setAvailability("");
//       setImageUri("");
//     } catch (error) {
//       console.error("Error adding product:", error);
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       {/* Add Product Button at the Top */}
//       <Button title="Add Product" onPress={handleSubmit} />

//       <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
//       <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
//       <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
//       <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
//       <TextInput style={styles.input} placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
//       <TextInput style={styles.input} placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" />
//       <TextInput style={styles.input} placeholder="Brand" value={brand} onChangeText={setBrand} />
//       <TextInput style={styles.input} placeholder="SKU" value={sku} onChangeText={setSku} />
//       <TextInput style={styles.input} placeholder="Warranty Info" value={warranty} onChangeText={setWarranty} />
//       <TextInput style={styles.input} placeholder="Availability Status" value={availability} onChangeText={setAvailability} />

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {imageUri ? <Image source={{ uri: imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     borderRadius: 5,
//     backgroundColor: "#fff",
//   },
//   imagePicker: {
//     backgroundColor: "#6200ee",
//     padding: 10,
//     alignItems: "center",
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   imagePickerText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   previewImage: {
//     width: 100,
//     height: 100,
//     alignSelf: "center",
//     marginBottom: 10,
//   },
// });

// export default AddProduct;


// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, TextInput, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
// import * as ImagePicker from "react-native-image-picker";

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//   });

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         handleChange("imageUri", response.assets[0].uri);
//       }
//     });
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageUri } = product;

//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = new FormData();
//     Object.keys(product).forEach((key) => {
//       if (key !== "imageUri") newProduct.append(key, product[key]);
//     });

//     if (imageUri) {
//       newProduct.append("thumbnail", { uri: imageUri, type: "image/jpeg", name: "product-image.jpg" });
//     }

//     try {
//       const response = await fetch("http://localhost:3000/products", { method: "POST", body: newProduct });

//       if (!response.ok) throw new Error((await response.json()).message || "Failed to add product.");

//       Alert.alert("Success", "Product added successfully!");
//       setProduct({ title: "", description: "", category: "", price: "", stock: "", rating: "", brand: "", sku: "", warranty: "", availability: "", imageUri: "" });
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

      
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Add Product</Text>
//         </TouchableOpacity>
       
//       </View>

//       {Object.keys(product).map(
//         (key) =>
//           key !== "imageUri" && (
//             <TextInput
//               key={key}
//               style={styles.input}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={product[key]}
//               onChangeText={(value) => handleChange(key, value)}
//               keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//             />
//           )
//       )}

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
//   imagePickerText: { color: "#fff", fontWeight: "bold" },
//   previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
// });

// export default AddProduct;



// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
// import * as ImagePicker from "react-native-image-picker";

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//     imageBase64: "", // Add a new field for Base64 image
//   });

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         const selectedImage = response.assets[0];
//         handleChange("imageUri", selectedImage.uri);
//         convertImageToBase64(selectedImage.uri);
//       }
//     });
//   };

//   const convertImageToBase64 = (uri) => {
//     // Fetch the image and convert it to Base64
//     fetch(uri)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const base64data = reader.result; // This is the Base64 string
//           handleChange("imageBase64", base64data);
//         };
//         reader.readAsDataURL(blob);
//       })
//       .catch((error) => {
//         Alert.alert("Error", "Failed to convert image to Base64.");
//       });
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageBase64 } = product;

//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = new FormData();
//     Object.keys(product).forEach((key) => {
//       if (key !== "imageUri" && key !== "imageBase64") newProduct.append(key, product[key]);
//     });

//     if (imageBase64) {
//       newProduct.append("thumbnail", {
//         uri: imageBase64,
//         type: "image/jpeg",
//         name: "product-image.jpg",
//       });
//     }

//     try {
//       const response = await fetch("http://localhost:3000/products", { method: "POST", body: newProduct });

//       if (!response.ok) throw new Error((await response.json()).message || "Failed to add product.");

//       Alert.alert("Success", "Product added successfully!");
//       setProduct({ title: "", description: "", category: "", price: "", stock: "", rating: "", brand: "", sku: "", warranty: "", availability: "", imageUri: "", imageBase64: "" });
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Add Product</Text>
//         </TouchableOpacity>
//       </View>

//       {Object.keys(product).map(
//         (key) =>
//           key !== "imageUri" && key !== "imageBase64" && (
//             <TextInput
//               key={key}
//               style={styles.input}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={product[key]}
//               onChangeText={(value) => handleChange(key, value)}
//               keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//             />
//           )
//       )}

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
//   imagePickerText: { color: "#fff", fontWeight: "bold" },
//   previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
// });

// export default AddProduct;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
// import * as ImagePicker from "react-native-image-picker";
// import RNFS from "react-native-fs"; // Import react-native-fs for Base64 conversion

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//     imageBase64: "", // Store Base64 string here
//   });

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//         console.log("Image Picker Error:", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         const selectedImage = response.assets[0];
//         console.log("Selected Image URI:", selectedImage.uri);
//         handleChange("imageUri", selectedImage.uri);
//         await convertImageToBase64(selectedImage.uri);
//       }
//     });
//   };

//   const convertImageToBase64 = async (uri) => {
//     try {
//       const base64String = await RNFS.readFile(uri, "base64"); // Convert to Base64
//       handleChange("imageBase64", `data:image/jpeg;base64,${base64String}`); // Prepend MIME type
//     } catch (error) {
//       Alert.alert("Error", "Failed to convert image to Base64.");
//       console.log("Base64 Conversion Error:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageBase64 } = product;

//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = new FormData();
//     Object.keys(product).forEach((key) => {
//       if (key !== "imageUri" && key !== "imageBase64") newProduct.append(key, product[key]);
//     });

//     if (imageBase64) {
//       newProduct.append("thumbnail", imageBase64); // Append Base64 string
//     }

//     try {
//       const response = await fetch("http://localhost:3000/products", { method: "POST", body: newProduct });

//       if (!response.ok) throw new Error((await response.json()).message || "Failed to add product.");

//       Alert.alert("Success", "Product added successfully!");
//       resetForm();
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//       console.log("Submission Error:", error);
//     }
//   };

//   const resetForm = () => {
//     setProduct({
//       title: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       rating: "",
//       brand: "",
//       sku: "",
//       warranty: "",
//       availability: "",
//       imageUri: "",
//       imageBase64: "",
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       {/* Two Small Buttons Side by Side */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Add Product</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.smallButton} onPress={resetForm}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//       </View>

//       {Object.keys(product).map(
//         (key) =>
//           key !== "imageUri" && key !== "imageBase64" && (
//             <TextInput
//               key={key}
//               style={styles.input}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={product[key]}
//               onChangeText={(value) => handleChange(key, value)}
//               keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//             />
//           )
//       )}

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
//   imagePickerText: { color: "#fff", fontWeight: "bold" },
//   previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
// });

// export default AddProduct;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
// import * as ImagePicker from "react-native-image-picker";
// import RNFS from "react-native-fs"; // Import react-native-fs for Base64 conversion

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//     imageBase64: "", // Store Base64 string here
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = () => {
//     const options = {
//       mediaType: "photo",
//       quality: 0.8, // Slightly reduced for better performance
//       maxWidth: 800, // Limit image size
//       maxHeight: 800,
//     };
    
//     ImagePicker.launchImageLibrary(options, async (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//         console.log("Image Picker Error:", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         const selectedImage = response.assets[0];
//         console.log("Selected Image URI:", selectedImage.uri);
//         handleChange("imageUri", selectedImage.uri);
//         setIsLoading(true);
//         await convertImageToBase64(selectedImage.uri);
//         setIsLoading(false);
//       }
//     });
//   };

//   const convertImageToBase64 = async (uri) => {
//     try {
//       // Extract the local path from the URI for Android
//       const filePath = uri.startsWith('file://') ? uri.slice(7) : uri;
      
//       const base64String = await RNFS.readFile(filePath, "base64"); // Convert to Base64
//       handleChange("imageBase64", `data:image/jpeg;base64,${base64String}`); // Prepend MIME type
//       console.log("Base64 conversion successful");
//     } catch (error) {
//       Alert.alert("Error", "Failed to convert image to Base64.");
//       console.log("Base64 Conversion Error:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageBase64 } = product;

//     if (!title || !description || !category || !price || !stock || !brand || !sku) {
//       Alert.alert("Error", "Please fill in all required fields (title, description, category, price, stock, brand, SKU).");
//       return;
//     }

//     setIsLoading(true);
    
//     const newProduct = new FormData();
//     Object.keys(product).forEach((key) => {
//       if (key !== "imageUri" && key !== "imageBase64") newProduct.append(key, product[key]);
//     });

//     if (imageBase64) {
//       newProduct.append("thumbnail", imageBase64); // Append Base64 string
//     }

//     try {
//       const response = await fetch("http://localhost:3000/products", { 
//         method: "POST", 
//         body: newProduct,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add product.");
//       }

//       Alert.alert("Success", "Product added successfully!");
//       resetForm();
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//       console.log("Submission Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setProduct({
//       title: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       rating: "",
//       brand: "",
//       sku: "",
//       warranty: "",
//       availability: "",
//       imageUri: "",
//       imageBase64: "",
//     });
//   };

//   const renderInputField = (key) => {
//     const isRequired = ["title", "description", "category", "price", "stock", "brand", "sku"].includes(key);
//     const label = key.charAt(0).toUpperCase() + key.slice(1) + (isRequired ? " *" : "");
    
//     return (
//       <View key={key} style={styles.inputContainer}>
//         <Text style={styles.inputLabel}>{label}</Text>
//         <TextInput
//           style={styles.input}
//           placeholder={`Enter ${key}`}
//           value={product[key]}
//           onChangeText={(value) => handleChange(key, value)}
//           keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//           multiline={key === "description"}
//           numberOfLines={key === "description" ? 4 : 1}
//         />
//       </View>
//     );
//   };

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.container}
//       keyboardShouldPersistTaps="handled"
//       showsVerticalScrollIndicator={true}
//     >
//       <Text style={styles.title}>Add New Product</Text>

//       {/* Form Fields */}
//       {Object.keys(product).map(
//         (key) => key !== "imageUri" && key !== "imageBase64" && renderInputField(key)
//       )}

//       {/* Image Selection */}
//       <TouchableOpacity 
//         style={styles.imagePicker} 
//         onPress={selectImage}
//         disabled={isLoading}
//       >
//         <Text style={styles.imagePickerText}>
//           {product.imageUri ? "Change Product Image" : "Select Product Image"}
//         </Text>
//       </TouchableOpacity>

//       {/* Image Preview */}
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
//       ) : product.imageUri ? (
//         <View style={styles.imagePreviewContainer}>
//           <Image source={{ uri: product.imageUri }} style={styles.previewImage} />
//           <Text style={styles.imageInfoText}>Image ready to upload</Text>
//         </View>
//       ) : null}

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity 
//           style={[styles.smallButton, isLoading && styles.disabledButton]} 
//           onPress={handleSubmit}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Add Product</Text>
//           )}
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.smallButton, styles.resetButton, isLoading && styles.disabledButton]} 
//           onPress={resetForm}
//           disabled={isLoading}
//         >
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   inputLabel: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: "#333",
//     fontWeight: "500",
//   },
//   input: {
//     width: "100%",
//     padding: 12,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     backgroundColor: "#fff",
//     fontSize: 16,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   smallButton: {
//     flex: 1,
//     backgroundColor: "#6200ee",
//     padding: 15,
//     marginHorizontal: 5,
//     alignItems: "center",
//     borderRadius: 5,
//     elevation: 2,
//   },
//   resetButton: {
//     backgroundColor: "#888",
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   imagePicker: {
//     backgroundColor: "#6200ee",
//     padding: 15,
//     alignItems: "center",
//     borderRadius: 5,
//     marginVertical: 15,
//     elevation: 2,
//   },
//   imagePickerText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   imagePreviewContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   previewImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 5,
//     marginBottom: 5,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   imageInfoText: {
//     color: "#666",
//     fontStyle: "italic",
//   },
//   loader: {
//     marginVertical: 20,
//   },
// });

// export default AddProduct;








// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
// import * as ImagePicker from "react-native-image-picker";

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//   });

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = async () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//         console.log("Image Picker Error:", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         const selectedImage = response.assets[0];
//         console.log("Selected Image URI:", selectedImage.uri);
//         handleChange("imageUri", selectedImage.uri);
//       }
//     });
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageUri } = product;

//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = new FormData();
//     Object.keys(product).forEach((key) => {
//       if (key !== "imageUri") newProduct.append(key, product[key]);
//     });

//     if (imageUri) {
//       newProduct.append("thumbnail", {
//         uri: imageUri,
//         name: "image.jpg",
//         type: "image/jpeg",
//       });
//     }

//     try {
//       const response = await fetch("http://localhost:3000/products", {
//         method: "POST",
//         body: newProduct,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (!response.ok) throw new Error((await response.json()).message || "Failed to add product.");

//       Alert.alert("Success", "Product added successfully!");
//       resetForm();
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//       console.log("Submission Error:", error);
//     }
//   };

//   const resetForm = () => {
//     setProduct({
//       title: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       rating: "",
//       brand: "",
//       sku: "",
//       warranty: "",
//       availability: "",
//       imageUri: "",
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Add Product</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.smallButton} onPress={resetForm}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//       </View>

//       {Object.keys(product).map(
//         (key) =>
//           key !== "imageUri" && (
//             <TextInput
//               key={key}
//               style={styles.input}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={product[key]}
//               onChangeText={(value) => handleChange(key, value)}
//               keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//             />
//           )
//       )}

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
//   imagePickerText: { color: "#fff", fontWeight: "bold" },
//   previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
// });

// export default AddProduct;



///////////////////////////////////////////////////////////////////////////////////////////////////////////




// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
// import * as ImagePicker from "react-native-image-picker";
// import RNFS from "react-native-fs"; // For Base64 conversion

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//     imageBase64: "", // Store Base64 string
//   });

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//         console.log("Image Picker Error:", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         const selectedImage = response.assets[0];
//         console.log("Selected Image URI:", selectedImage.uri);
//         handleChange("imageUri", selectedImage.uri);
//         await convertImageToBase64(selectedImage.uri);
//       }
//     });
//   };

//   const convertImageToBase64 = async (uri) => {
//     try {
//       const base64String = await RNFS.readFile(uri, "base64"); // Convert to Base64
//       handleChange("imageBase64", `data:image/jpeg;base64,${base64String}`); // Prepend MIME type
//     } catch (error) {
//       Alert.alert("Error", "Failed to convert image to Base64.");
//       console.log("Base64 Conversion Error:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageBase64 } = product;

//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = new FormData();
//     Object.keys(product).forEach((key) => {
//       if (key !== "imageUri" && key !== "imageBase64") newProduct.append(key, product[key]);
//     });

//     if (imageBase64) {
//       newProduct.append("thumbnail", imageBase64); // Append Base64 string
//     }

//     try {
//       const response = await fetch("http://localhost:3000/products", { method: "POST", body: newProduct });

//       if (!response.ok) throw new Error((await response.json()).message || "Failed to add product.");

//       Alert.alert("Success", "Product added successfully!");
//       resetForm();
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//       console.log("Submission Error:", error);
//     }
//   };

//   const resetForm = () => {
//     setProduct({
//       title: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       rating: "",
//       brand: "",
//       sku: "",
//       warranty: "",
//       availability: "",
//       imageUri: "",
//       imageBase64: "",
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       {/* Two Small Buttons Side by Side */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Add Product</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.smallButton} onPress={resetForm}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//       </View>

//       {Object.keys(product).map(
//         (key) =>
//           key !== "imageUri" && key !== "imageBase64" && (
//             <TextInput
//               key={key}
//               style={styles.input}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={product[key]}
//               onChangeText={(value) => handleChange(key, value)}
//               keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//             />
//           )
//       )}

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
//   imagePickerText: { color: "#fff", fontWeight: "bold" },
//   previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
// });

// export default AddProduct;









// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
// import * as ImagePicker from "react-native-image-picker";
// import RNFS from "react-native-fs"; // For Base64 conversion

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//     imageBase64: "", // Store Base64 string
//   });

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//         console.log("Image Picker Error:", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         const selectedImage = response.assets[0];
//         console.log("Selected Image URI:", selectedImage.uri);
//         handleChange("imageUri", selectedImage.uri);
//         await convertImageToBase64(selectedImage.uri);
//       }
//     });
//   };

//   const convertImageToBase64 = async (uri) => {
//     try {
//       const base64String = await RNFS.readFile(uri, "base64"); // Convert to Base64
//       handleChange("imageBase64", base64String); // Store raw Base64 (no prefix)
//     } catch (error) {
//       Alert.alert("Error", "Failed to convert image to Base64.");
//       console.log("Base64 Conversion Error:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageBase64 } = product;

//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = {
//       title,
//       description,
//       category,
//       price,
//       stock,
//       rating,
//       brand,
//       sku,
//       warranty,
//       availability,
//       image: `data:image/jpeg;base64,${imageBase64}`, // Send image as Base64
//     };

//     try {
//       const response = await fetch("http://localhost:3000/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });

//       if (!response.ok) throw new Error((await response.json()).message || "Failed to add product.");

//       Alert.alert("Success", "Product added successfully!");
//       resetForm();
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//       console.log("Submission Error:", error);
//     }
//   };

//   const resetForm = () => {
//     setProduct({
//       title: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       rating: "",
//       brand: "",
//       sku: "",
//       warranty: "",
//       availability: "",
//       imageUri: "",
//       imageBase64: "",
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Add Product</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.smallButton} onPress={resetForm}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//       </View>

//       {Object.keys(product).map(
//         (key) =>
//           key !== "imageUri" && key !== "imageBase64" && (
//             <TextInput
//               key={key}
//               style={styles.input}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={product[key]}
//               onChangeText={(value) => handleChange(key, value)}
//               keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//             />
//           )
//       )}

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
//   imagePickerText: { color: "#fff", fontWeight: "bold" },
//   previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
// });

// export default AddProduct;





// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
// import * as ImagePicker from "react-native-image-picker";
// import RNFS from "react-native-fs"; // For Base64 conversion

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//     imageBase64: "", // Store Base64 string
//   });

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = async () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//         console.log("Image Picker Error:", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         const selectedImage = response.assets[0];
//         handleChange("imageUri", selectedImage.uri);
//         convertImageToBase64(selectedImage.uri);
//       }
//     });
//   };

//   const convertImageToBase64 = async (uri) => {
//     try {
//       const base64String = await RNFS.readFile(uri, "base64");
//       handleChange("imageBase64", base64String);
//     } catch (error) {
//       Alert.alert("Error", "Failed to convert image to Base64.");
//       console.log("Base64 Conversion Error:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageBase64 } = product;

//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     const newProduct = {
//       title,
//       description,
//       category,
//       price,
//       stock,
//       rating,
//       brand,
//       sku,
//       warranty,
//       availability,
//       image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : "",
//     };

//     try {
//       const response = await fetch("http://10.0.2.2:3000/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add product.");
//       }

//       Alert.alert("Success", "Product added successfully!");
//       resetForm();
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//       console.log("Submission Error:", error);
//     }
//   };

//   const resetForm = () => {
//     setProduct({
//       title: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       rating: "",
//       brand: "",
//       sku: "",
//       warranty: "",
//       availability: "",
//       imageUri: "",
//       imageBase64: "",
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Add Product</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.smallButton} onPress={resetForm}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//       </View>

//       {Object.keys(product).map(
//         (key) =>
//           key !== "imageUri" && key !== "imageBase64" && (
//             <TextInput
//               key={key}
//               style={styles.input}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={product[key]}
//               onChangeText={(value) => handleChange(key, value)}
//               keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//             />
//           )
//       )}

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
//   imagePickerText: { color: "#fff", fontWeight: "bold" },
//   previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
// });

// export default AddProduct;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
// import * as ImagePicker from "react-native-image-picker";
// import RNFS from "react-native-fs"; // For Base64 conversion

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     rating: "",
//     brand: "",
//     sku: "",
//     warranty: "",
//     availability: "",
//     imageUri: "",
//     imageBase64: "", // Store Base64 string
//   });

//   const handleChange = (name, value) => {
//     setProduct({ ...product, [name]: value });
//   };

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "Image selection cancelled.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//         console.log("Image Picker Error:", response.errorMessage);
//       } else if (response.assets?.length > 0) {
//         const selectedImage = response.assets[0];
//         console.log("Selected Image URI:", selectedImage.uri);
//         handleChange("imageUri", selectedImage.uri);
//         await convertImageToBase64(selectedImage.uri);
//       }
//     });
//   };

//   const convertImageToBase64 = async (uri) => {
//     try {
//       const base64String = await RNFS.readFile(uri, "base64"); // Convert to Base64
//       handleChange("imageBase64", base64String); // Store raw Base64 (no prefix)
//     } catch (error) {
//       Alert.alert("Error", "Failed to convert image to Base64.");
//       console.log("Base64 Conversion Error:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageBase64 } = product;

//     if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
//       Alert.alert("Error", "All fields except image are required!");
//       return;
//     }

//     try {
//       // Fetch existing products to determine the next ID
//       const response = await fetch("http://10.0.2.2:3000/products");
//       if (!response.ok) throw new Error("Failed to fetch products.");

//       const existingProducts = await response.json();
//       const newId = existingProducts.length > 0 ? Math.max(...existingProducts.map(p => p.id)) + 1 : 1;

//       const newProduct = {
//         id: newId, // Assign the new ID
//         title,
//         description,
//         category,
//         price,
//         stock,
//         rating,
//         brand,
//         sku,
//         warranty,
//         availability,
//         image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : "",
//       };

//       // Send POST request to add new product
//       const postResponse = await fetch("http://10.0.2.2:3000/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });

//       if (!postResponse.ok) throw new Error((await postResponse.json()).message || "Failed to add product.");

//       Alert.alert("Success", "Product added successfully!");
//       resetForm();
//     } catch (error) {
//       Alert.alert("Error", `Failed to add product: ${error.message}`);
//       console.log("Submission Error:", error);
//     }
//   };

//   const resetForm = () => {
//     setProduct({
//       title: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       rating: "",
//       brand: "",
//       sku: "",
//       warranty: "",
//       availability: "",
//       imageUri: "",
//       imageBase64: "",
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add New Product</Text>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Add Product</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.smallButton} onPress={resetForm}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//       </View>

//       {Object.keys(product).map(
//         (key) =>
//           key !== "imageUri" && key !== "imageBase64" && (
//             <TextInput
//               key={key}
//               style={styles.input}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={product[key]}
//               onChangeText={(value) => handleChange(key, value)}
//               keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
//             />
//           )
//       )}

//       <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
//         <Text style={styles.imagePickerText}>Select Product Image</Text>
//       </TouchableOpacity>

//       {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
//   buttonText: { color: "#fff", fontWeight: "bold" },

//   imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
//   imagePickerText: { color: "#fff", fontWeight: "bold" },
//   previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
// });

// export default AddProduct;





//////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import RNFS from "react-native-fs"; 

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
    brand: "",
    sku: "",
    warranty: "",
    availability: "",
    imageUri: "",
    imageBase64: "",
  });

  const handleChange = (name, value) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
      if (response.didCancel) {
        Alert.alert("Cancelled", "Image selection cancelled.");
        return;
      }
      if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
        console.log("Image Picker Error:", response.errorMessage);
        return;
      }
      if (response.assets?.length > 0) {
        const selectedImage = response.assets[0];
        handleChange("imageUri", selectedImage.uri);
        await convertImageToBase64(selectedImage.uri);
      }
    });
  };

  const convertImageToBase64 = async (uri) => {
    if (!uri) return;
    try {
      const base64String = await RNFS.readFile(uri, "base64");
      handleChange("imageBase64", base64String);
    } catch (error) {
      Alert.alert("Error", "Failed to convert image to Base64.");
      console.log("Base64 Conversion Error:", error);
    }
  };

  const handleSubmit = async () => {
    const { title, description, category, price, stock, rating, brand, sku, warranty, availability, imageBase64 } = product;

    // Validate numeric inputs properly
    const formattedProduct = {
      title,
      description,
      category,
      price: price ? parseFloat(price) : 0,
      stock: stock ? parseInt(stock) : 0,
      rating: rating ? parseFloat(rating) : 0,
      brand,
      sku,
      warranty,
      availability,
      image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : "",
    };

    // Check required fields
    if (!title || !description || !category || !price || !stock || !rating || !brand || !sku || !warranty || !availability) {
      Alert.alert("Error", "All fields except image are required!");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:3000/products");
      if (!response.ok) throw new Error("Failed to fetch products.");
      
      const existingProducts = await response.json();
      const newId = existingProducts.length > 0 ? Math.max(...existingProducts.map((p) => p.id)) + 1 : 1;

      formattedProduct.id = newId;

      const postResponse = await fetch("http://10.0.2.2:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedProduct),
      });

      if (!postResponse.ok) throw new Error("Failed to add product.");

      Alert.alert("Success", "Product added successfully!");
      resetForm();
    } catch (error) {
      Alert.alert("Error", `Failed to add product: ${error.message}`);
      console.log("Submission Error:", error);
    }
  };

  const resetForm = () => {
    setProduct({
      title: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      rating: "",
      brand: "",
      sku: "",
      warranty: "",
      availability: "",
      imageUri: "",
      imageBase64: "",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={resetForm}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {Object.keys(product).map(
        (key) =>
          key !== "imageUri" && key !== "imageBase64" && (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={product[key]}
              onChangeText={(value) => handleChange(key, value)}
              keyboardType={["price", "stock", "rating"].includes(key) ? "numeric" : "default"}
            />
          )
      )}

      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
        <Text style={styles.imagePickerText}>Select Product Image</Text>
      </TouchableOpacity>

      {product.imageUri ? <Image source={{ uri: product.imageUri }} style={styles.previewImage} /> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  smallButton: { flex: 1, backgroundColor: "#6200ee", padding: 10, marginHorizontal: 5, alignItems: "center", borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },

  imagePicker: { backgroundColor: "#6200ee", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
  imagePickerText: { color: "#fff", fontWeight: "bold" },
  previewImage: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
});

export default AddProduct;
