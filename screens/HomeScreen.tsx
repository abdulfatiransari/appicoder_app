import { RootStackParamList } from '@/app/_layout';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigation } from '@react-navigation/native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { RootState } from '../store';

const HomeScreen = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isConnected = useNetworkStatus();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (isConnected) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          setUsers(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch users');
          setLoading(false);
        });
    }
  }, [isConnected]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome {user?.email}</Text>
      <Text style={styles.networkStatus}>{isConnected ? 'Online' : 'Offline'}</Text>
      <Button title="Logout" onPress={handleLogout} />
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button
              title="Details"
              onPress={() => navigation.navigate('Details', { user: item })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  networkStatus: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 16,
  },
  userContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
