// src/components/Item.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ItemType } from '../types';

interface ItemProps {
  item: ItemType;
}

const ItemComponent: React.FC<ItemProps> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.item_image }} style={styles.image} />
      <Text style={styles.itemName}>{item.item_name}</Text>
      <Text style={styles.itemDesc}>{item.item_desc}</Text>
      <Text style={styles.itemRating}>Rating: {item.get_average_rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 14,
    color: '#555',
  },
  itemRating: {
    fontSize: 14,
    color: '#999',
  },
});

export default ItemComponent;
