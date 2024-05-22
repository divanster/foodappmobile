// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getItems } from '../api/api';
import ItemComponent from '../components/Item';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { ItemType } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<ItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getItems();
        console.log('API response:', result);
        if (Array.isArray(result)) {
          setData(result);
        } else if (result && Array.isArray(result.results)) {
          setData(result.results);
        } else {
          console.error('Unexpected API response structure:', result);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItemPress = () => {
    console.log('Navigating to AddItem screen');
    navigation.navigate('AddItem');
  };

  const handleItemPress = (itemId: number) => {
    console.log('Navigating to ItemDetail screen with itemId:', itemId);
    navigation.navigate('ItemDetail', { itemId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recepti</Text>
      <Button title="Add Item" onPress={handleAddItemPress} />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item.id)}>
            <ItemComponent item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
