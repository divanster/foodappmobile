// src/types/navigation.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  AddItem: undefined;
  ItemDetail: { itemId: number };
  Comments: { itemId: number };
  Profile: undefined;
};

export type ItemDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ItemDetail'
>;

export type ItemDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ItemDetail'
>;

export interface ItemDetailScreenProps {
  navigation: ItemDetailScreenNavigationProp;
  route: ItemDetailScreenRouteProp;
}

export type CommentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Comments'
>;

export type CommentScreenRouteProp = RouteProp<RootStackParamList, 'Comments'>;

export interface CommentScreenProps {
  navigation: CommentScreenNavigationProp;
  route: CommentScreenRouteProp;
}

export interface AddItemScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'AddItem'>;
}
