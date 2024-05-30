import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  getItem,
  rateItem,
  getComments,
  addComment,
  deleteComment,
} from '../api/api';

const ItemDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const [item, setItem] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const { itemId } = route.params;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await getItem(itemId);
        setItem(fetchedItem);
        setRating(fetchedItem.get_average_rating || 0);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(itemId);
        setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchItem();
    fetchComments();
  }, [itemId]);

  const handleRateItem = async () => {
    try {
      const response = await rateItem(itemId, rating);
      console.log('Item rated successfully:', response);
    } catch (error) {
      console.error('Failed to rate item:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    try {
      const response = await addComment(itemId, newComment);
      console.log('API response in addComment:', response); // Log the response
      if (response && response.content) {
        // Ensure response has the expected structure
        setComments(prevComments => [...prevComments, response]);
      } else {
        console.error('Unexpected response structure:', response);
      }
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(itemId, commentId);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
    } catch (error) {
      console.error('Failed to delete comment:', error);
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
      <Text style={styles.commentHeader}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item: comment }) => (
          <View style={styles.comment}>
            <Text>
              {comment.user.username}: {comment.content}
            </Text>
            <Text>{comment.created_at}</Text>
            <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Add Comment" onPress={handleAddComment} />
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
  commentHeader: {
    fontSize: 20,
    marginVertical: 10,
  },
  comment: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
  },
});

export default ItemDetailScreen;
