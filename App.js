import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/Dashboard';
import Setup from './src/Setup';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

function App() {
  const isSignedIn = true

  
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='setup' screenOptions={{ headerShown: false }}>
        {isSignedIn ?
          <Stack.Screen name='dashboard' component={Dashboard} />
          :
          <Stack.Screen name='setup' component={Setup} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}




export default App;
