import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Product from '../Products/Product';

const HomePage = () => {
  return (
    <>
      <View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text>Home Screen</Text> */}
        <Product/>
      </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
