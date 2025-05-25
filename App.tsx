import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrdersProvider } from './src/contexts/OrdersContext';
import { RootStackParamList } from './src/navigation/types';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import MyOrdersScreen from './src/screens/MyOrdersScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <OrdersProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('MyOrders')}
                title='My Orders'
              />
            ),
          })}
        >
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ title: 'Now Showing' }}
          />
          <Stack.Screen
            name='Details'
            component={DetailsScreen}
            options={{ title: 'Movie Details' }}
          />
          <Stack.Screen
            name='Checkout'
            component={CheckoutScreen}
            options={{ title: 'Select Seats' }}
          />
          <Stack.Screen
            name='MyOrders'
            component={MyOrdersScreen}
            options={{ title: 'My Orders' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OrdersProvider>
  );
}
