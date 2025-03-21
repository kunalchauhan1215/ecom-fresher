import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Product from "../../Product.json";
import Colors from '../../components/colors';
import { useSelector } from 'react-redux';

const Searching = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchMode, setSearchMode] = useState('name');
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const fetchedproducts = useSelector(state => state.product?.product);
 

  useEffect(() => {
    // setProducts(Product.products || []);
    setProducts(fetchedproducts|| []);
    setFilteredProducts(fetchedproducts || []);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, searchMode]);

  const handleSearch = () => {
    let filtered = products;

    if (searchQuery.trim() !== '') {
      if (searchMode === 'name') {
        filtered = products.filter((product) =>
          product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchMode === 'rating') {
        const ratingValue = parseFloat(searchQuery);
        if (!isNaN(ratingValue)) {
          filtered = products.filter(
            (product) => product.rating && Math.floor(product.rating) === Math.floor(ratingValue)
          );
        } else {
          filtered = [];
        }
      } else if (searchMode === 'price') {
        const priceValue = parseFloat(searchQuery);
        if (!isNaN(priceValue)) {
          filtered = products.filter(
            (product) => product.price && Math.floor(product.price) === Math.floor(priceValue)
          );
        } else {
          filtered = [];
        }
      }
    } else {
      filtered = products;
    }

    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredProducts(filtered);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={styles.productStock}>
          {item.availabilityStatus} ({item.stock} in stock)
        </Text>
        <Text style={styles.productRating}>Rating: {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon name="search" size={24} color={Colors.placeholder} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInputField}
            placeholder={`Search products by ${searchMode}`}
            placeholderTextColor={Colors.placeholder}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            keyboardType={searchMode === 'name' ? 'default' : 'numeric'} />
        </View>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.searchButton}>
          <Icon name="language" size={24} color={Colors.textLight} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Products:</Text>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent} />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Select Search Mode:</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setSearchMode('name');
                setIsModalVisible(false);
              }}>
              <Text style={styles.optionText}>Search by Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setSearchMode('price');
                setIsModalVisible(false);
              }}>
              <Text style={styles.optionText}>Search by Price</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setSearchMode('rating');
                setIsModalVisible(false);
              }}>
              <Text style={styles.optionText}>Search by Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.backgroundLight,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInputField: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: Colors.accent,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 50,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.textDark,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: Colors.surfaceLight,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    flexDirection: 'row',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1,
    padding: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.textDark,
  },
  productDescription: {
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  productStock: {
    fontSize: 12,
    color: 'green',
  },
  productRating: {
    fontSize: 12,
    color: 'orange',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.textDark,
  },
  optionButton: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  optionText: {
    color: Colors.textLight,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Colors.placeholder,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: Colors.textDark,
    fontSize: 16,
  },
});

export default Searching;
