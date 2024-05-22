// src/components/Comment.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface User {
  id: number;
  username: string;
}

interface CommentProps {
  comment: {
    id: number;
    content: string;
    user: User;
  };
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{comment.user.username}</Text>
      <Text style={styles.content}>{comment.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    marginTop: 4,
  },
});

export default CommentComponent;
