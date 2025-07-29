import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);

 useFocusEffect(
  useCallback(() => {
    const fetchOrders = async () => {
      const data = await AsyncStorage.getItem('orders');
      if (data) {
        const parsed = JSON.parse(data);
        setOrders(parsed.reverse()); // ✅ latest first
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [])
);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>📜 Order History</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.order}>
              <Text style={styles.code}>Order Code: {item.code}</Text>
              <Text>Total: ₱{item.total}</Text>
              <Text>Date: {new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ marginTop: 10 }}>No orders yet.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  listContainer: {
    flex: 1,
    maxHeight: Dimensions.get('window').height * 0.7, // limits to 70% of screen
  },
  order: {
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    marginBottom: 10,
  },
  code: {
    fontWeight: 'bold'
  }
});

export default HistoryScreen;
