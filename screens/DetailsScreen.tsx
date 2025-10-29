import { RootStackParamList } from '@/app/_layout';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = StackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Phone: {user.phone}</Text>
      <Text style={styles.text}>Website: {user.website}</Text>
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
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default DetailsScreen;
