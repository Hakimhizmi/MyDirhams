import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import CustomBar from './components/customBar';
import Charts from './components/charts';

const Tab = createMaterialTopTabNavigator();

export default function Statistique() {
  return (
    <Tab.Navigator initialRouteName='expenses_statistique' tabBar={(props) => <CustomBar {...props} />} >
      <Tab.Screen name="expenses_statistique" component={() => <Charts table={'expenses'} />} />
      <Tab.Screen name="income_statistique" component={() => <Charts table={'income'} />} />
    </Tab.Navigator>
  )
}
