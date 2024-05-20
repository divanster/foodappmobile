// src/screens/CommentScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { CommentScreenProps } from '../types/navigation'; // Adjust the path if necessary
import { getComments, addComment } from '../api/api';
import Comment from '../components/Comment';

interface Comment {
  id: number;
  content: string;
  user: {
    username: string;
  };
}

const CommentScreen: React.FC<CommentScreenProps> = ({ route }) => {
  const { itemId } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getComments(itemId);
        setComments(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [itemId]);

  const handleAddComment = async () => {
    try {
      const newComment = await addComment({ content, item: itemId });
      setComments([...comments, newComment]);
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Comment comment={item} />}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Submit" onPress={handleAddComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});

export default CommentScreen;
