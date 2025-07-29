import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateOrderCode } from '../utils/orderCode';

const CartScreen = ({ navigation, cart, setCart }) => {
  const [orderCode, setOrderCode] = useState(null);
  const [confirmedTotal, setConfirmedTotal] = useState(null);

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += change;

    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleConfirmOrder = async () => {
    const newCode = generateOrderCode();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setOrderCode(newCode);
    setConfirmedTotal(total);

    const newOrder = {
      code: newCode,
      items: cart,
      total,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = await AsyncStorage.getItem('orders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.push(newOrder);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));

      Alert.alert(
        'Order Confirmed',
        `Code: ${newCode}\nTotal: ₱${total}`,
        [{ text: 'OK', onPress: () => navigation.navigate('Menu', { resetCart: true }) }]
      );
    } catch (error) {
      console.error('Order save failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Your Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.quantity} x ₱{item.price} = ₱{item.price * item.quantity}</Text>
            </View>
            <View style={styles.controls}>
              <Button title="➖" onPress={() => updateQuantity(index, -1)} />
              <Button title="➕" onPress={() => updateQuantity(index, 1)} />
              <Button title="🗑️" onPress={() => removeItem(index)} color="red" />
            </View>
          </View>
        )}
      />

      {orderCode && <Text style={styles.code}>Order Code: {orderCode}</Text>}
      {confirmedTotal !== null && <Text style={styles.total}>Total: ₱{confirmedTotal}</Text>}

      <View style={styles.confirm}>
        <Button title="✅ Confirm Order" onPress={handleConfirmOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 8,
    borderRadius: 10
  },
  name: { fontWeight: 'bold' },
  controls: { flexDirection: 'row', gap: 5 },
  code: { marginTop: 15, fontStyle: 'italic', color: '#444' },
  total: { marginTop: 5, fontSize: 18, fontWeight: 'bold' },
  confirm: { marginTop: 20 }
});

export default CartScreen;
