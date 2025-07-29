import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MenuItem = ({ item, onAdd }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{item.name}</Text>
    <Text>₱{item.price}</Text>
    <Button title="Add" onPress={() => onAdd(item)} />
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10
  },
  name: {
    fontWeight: 'bold'
  }
});

export default MenuItem;
