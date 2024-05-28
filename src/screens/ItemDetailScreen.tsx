import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { getItem, rateItem } from '../api/api'; // Ensure the path is correct

const ItemDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const [item, setItem] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const { itemId } = route.params; // Assuming you pass itemId through navigation params

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await getItem(itemId);
        setItem(fetchedItem);
        setRating(fetchedItem.get_average_rating || 0); // Assuming your API returns average rating
      } catch (error) {
        console.error('Failed to fetch item details:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleRateItem = async () => {
    try {
      const response = await rateItem(itemId, rating);
      console.log('Item rated successfully:', response);
    } catch (error) {
      console.error('Failed to rate item:', error);
    }
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.item_name}</Text>
      <Image source={{ uri: item.item_image }} style={styles.image} />
      <Text>{item.item_desc}</Text>
      <Text>Current Rating: {rating}</Text>
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5].map(rate => (
          <Button
            key={rate}
            title={`${rate}`}
            onPress={() => setRating(rate)}
          />
        ))}
      </View>
      <Button title="Submit Rating" onPress={handleRateItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default ItemDetailScreen;
