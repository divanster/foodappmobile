// src/screens/ItemDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getItem, rateItem } from '../api/api';
import { ItemDetailScreenProps } from '../types/navigation';
import ItemComponent from '../components/Item';
import Rating from '../components/Rating';

interface Item {
  id: number;
  item_name: string;
  item_desc: string;
  item_image: string;
  get_average_rating: number;
}

const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({ route }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState<Item | null>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await getItem(itemId);
        setItem(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleRateItem = async () => {
    try {
      const updatedItem = await rateItem(itemId, rating);
      setItem(updatedItem);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {item ? (
        <>
          <ItemComponent item={item} />
          <Rating rating={rating} setRating={setRating} />
          <Button title="Submit Rating" onPress={handleRateItem} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ItemDetailScreen;
