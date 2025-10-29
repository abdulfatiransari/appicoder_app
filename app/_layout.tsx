import DetailsScreen from '@/screens/DetailsScreen';
import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import store, { RootState } from '@/store';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider, useSelector } from 'react-redux';

export type RootStackParamList = {
  Home: undefined;
  Details: { user: any };
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
