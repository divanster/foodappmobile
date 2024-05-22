// src/components/NavBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const NavBar: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar.Header>
      <Appbar.Content title="Рецепти" />
      <View style={styles.menuContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="black" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Home');
            }}
            title="Рецепти"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('AddItem');
            }}
            title="Добави рецепта"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Profile');
            }}
            title="Профил"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Login');
            }}
            title="Logout"
          />
        </Menu>
      </View>
    </Appbar.Header>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
