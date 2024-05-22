import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../components/NavBar';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <NavBar />
      <Text>Profile Screen Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
