// src/components/Rating.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface RatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, setRating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text>Rating: {rating}</Text>
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5].map(rate => (
          <Button
            key={rate}
            title={`${rate}`}
            onPress={() => setRating(rate)}
          />
        ))}
      </View>
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
