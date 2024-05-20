// src/types/navigation.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  ItemDetail: { itemId: number };
  Comments: { itemId: number };
};

type ItemDetailScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>;

type ItemDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ItemDetail'
>;

export type ItemDetailScreenProps = {
  route: ItemDetailScreenRouteProp;
  navigation: ItemDetailScreenNavigationProp;
};

type CommentScreenRouteProp = RouteProp<RootStackParamList, 'Comments'>;

type CommentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Comments'
>;

export type CommentScreenProps = {
  route: CommentScreenRouteProp;
  navigation: CommentScreenNavigationProp;
};
