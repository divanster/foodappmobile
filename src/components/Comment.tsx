// src/components/Comment.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CommentProps {
  comment: {
    id: number; // Ensure 'id' is included in the Comment interface
    content: string;
    user: {
      username: string;
    };
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => (
  <View style={styles.commentContainer}>
    <Text style={styles.username}>{comment.user.username}</Text>
    <Text style={styles.content}>{comment.content}</Text>
  </View>
);

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
  },
});

export default Comment;
