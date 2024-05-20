import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ItemProps {
  item: {
    item_name: string;
    item_desc: string;
  };
}

const Item: React.FC<ItemProps> = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.item_name}</Text>
    <Text style={styles.itemDesc}>{item.item_desc}</Text>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 14,
  },
});

export default Item;
