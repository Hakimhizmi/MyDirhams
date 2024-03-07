import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import Welcome from './components/setup/welcome';
import Info from './components/setup/info';
import Register from './components/setup/register';
import Language from './components/setup/language';

const Tab = createMaterialTopTabNavigator();

export default function Setup() {
  
  return (
    <Tab.Navigator initialRouteName='welcome' tabBar={() => null} >
      <Tab.Screen name="welcome" component={Welcome} />
      <Tab.Screen name="language" component={Language} />
      <Tab.Screen name="info" component={Info} />
      <Tab.Screen name="register" component={Register} options={{ swipeEnabled: false }} />
    </Tab.Navigator>
  )
}
