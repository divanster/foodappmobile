import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addItem } from '../api/api'; // Ensure no .ts extension

const AddItemScreen = ({ navigation }: { navigation: any }) => {
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');

  const handleSubmit = async () => {
    try {
      await addItem({ item_name: itemName, item_desc: itemDesc });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Item</Text>
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 4,
  },
});

export default AddItemScreen;
