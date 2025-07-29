import React, { useEffect } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import MenuItem from '../components/MenuItem';
import { menuItems } from '../data/menu';

const MenuScreen = ({ navigation, route, cart, setCart }) => {

  // Add to cart with quantity
  const addToCart = (item) => {
    const updatedItem = { ...item, quantity: 1 };
    setCart([...cart, updatedItem]);
  };

  // Reset cart after order
  useEffect(() => {
    if (route.params?.resetCart) {
      setCart([]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MenuItem item={item} onAdd={addToCart} />
        )}
      />

      {/* Go to Cart button */}
      <View style={styles.cartButton}>
        <Button
          title={`🛒 Go to Cart (${cart.length})`}
          onPress={() => navigation.navigate('Cart', { cart })} 
          color="#2196F3"
        />
      </View>

      {/* View History button */}
      <View style={styles.button}>
        <Button
          title="📜 View Order History"
          onPress={() => navigation.navigate('History')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 150
  },
  cartButton: {
    position: 'absolute',
    bottom: 75,
    alignSelf: 'center',
    width: '90%'
  },
  button: {
    position: 'absolute',
    bottom: 140,
    alignSelf: 'center',
    width: '90%'
  }
});

export default MenuScreen;
