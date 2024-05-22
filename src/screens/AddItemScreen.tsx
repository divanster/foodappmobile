import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addItem } from '../api/api';
import { AddItemScreenProps } from '../types/navigation';
import axios from 'axios';

const DEFAULT_IMAGE_URL =
  'https://media.istockphoto.com/id/1426890025/es/foto/la-pizza-de-la-que-te-olvidaste-durante-una-semana-y-se-puso-mohosa.jpg?s=612x612&w=0&k=20&c=r0cHrYxEjoLUoSz9VQCglgXc6Win_fFu-fjDwWfoPu4=';

const AddItemScreen: React.FC<AddItemScreenProps> = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemImage, setItemImage] = useState('');

  const handleAddItem = async () => {
    if (!itemName || !itemDesc) {
      Alert.alert('Error', 'Item name and description are required.');
      return;
    }

    const newItem = {
      item_name: itemName,
      item_desc: itemDesc,
      item_image: itemImage || DEFAULT_IMAGE_URL,
    };

    try {
      console.log('Adding item with data:', newItem);
      await addItem(newItem);
      navigation.goBack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error adding item:',
          error.response?.data || error.message,
        );
      } else {
        console.error('Error adding item:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        value={itemDesc}
        onChangeText={setItemDesc}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Image URL"
        value={itemImage}
        onChangeText={setItemImage}
      />
      <Button title="Add Item" onPress={handleAddItem} />
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
    marginBottom: 10,
    padding: 10,
  },
});

export default AddItemScreen;
