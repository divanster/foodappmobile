// src/screens/CommentScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { CommentScreenProps } from '../types/navigation';

const CommentScreen: React.FC<CommentScreenProps> = ({ route }) => {
  const { itemId } = route.params;

  return (
    <View>
      <Text>Comments for item {itemId}</Text>
    </View>
  );
};

export default CommentScreen;
