import { useState, useEffect } from 'react';
import {View,Text,StyleSheet,FlatList,Image,TextInput,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Product from '../../Product.json';

const Searching = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchMode, setSearchMode] = useState('name'); 

  useEffect(() => {
    setProducts(Product.products || []);
    setFilteredProducts(Product.products || []);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    let filtered = products;

    if (query.trim() !== '') {
      if (searchMode === 'name') {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
      } else if (searchMode === 'rating') {
        const ratingValue = parseFloat(query);
        if (!isNaN(ratingValue)) {
          filtered = filtered.filter(
            (product) =>
              product.rating && Math.floor(product.rating) === Math.floor(ratingValue)
          );
        }
      } else if (searchMode === 'price') {
        const priceValue = parseFloat(query);
        if (!isNaN(priceValue)) {
          filtered = filtered.filter(
            (product) => product.price && Math.floor(product.price) === Math.floor(priceValue)
          );
        }
      }
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
      setFilteredProducts(filtered);
    }

   
    
  };

  const toggleSearchMode = () => {
    const nextMode =
      searchMode === 'name' ? 'rating' : searchMode === 'rating' ? 'price' : 'name';
    setSearchMode(nextMode);
    setSearchQuery(''); 
    setFilteredProducts(products); 
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
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={toggleSearchMode}>
          <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInputField}
          placeholder={`Search products by ${searchMode}`}
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
          keyboardType={searchMode === 'name' ? 'default' : 'numeric'}
        />
      </View>

      <Text style={styles.subHeader}>Products:</Text>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInputField: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
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
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  productStock: {
    fontSize: 12,
    color: 'green',
  },
  productRating: {
    fontSize: 12,
    color: '#ff9800',
  },
});

export default Searching;

