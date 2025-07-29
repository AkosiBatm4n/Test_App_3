import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu">
          {(props) => <MenuScreen {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => <CartScreen {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
        <Stack.Screen name="History" component={OrderHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
