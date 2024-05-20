import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface RatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, setRating }) => {
  const handleRate = (value: number) => {
    setRating(value);
  };

  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>Rating: {rating}</Text>
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5].map(value => (
          <Button
            key={value}
            title={`${value}`}
            onPress={() => handleRate(value)}
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
  },
  ratingText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default Rating;
