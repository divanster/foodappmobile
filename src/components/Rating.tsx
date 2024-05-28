import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { rateItem } from '../api/api'; // Adjust the import path as necessary

interface RatingProps {
  itemId: number; // Assuming you pass the itemId as a prop
}

const Rating: React.FC<RatingProps> = ({ itemId }) => {
  const [rating, setRating] = useState(0);

  const handleRateItem = async () => {
    try {
      const response = await rateItem(itemId, rating);
      console.log('Rating response:', response);
      alert('Rating submitted successfully');
    } catch (error) {
      console.error('Failed to rate item:', error);
      alert('Error submitting rating');
    }
  };

  return (
    <View style={styles.ratingContainer}>
      <Text>Rate this item:</Text>
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
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Rating;
