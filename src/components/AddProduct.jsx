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