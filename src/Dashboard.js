import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Dashboard/Home/home';
import Statistique from './components/Dashboard/statistique/statistique';
import CustomTabBar from './components/Dashboard/components/customTabBar';
import Expenses from './components/Dashboard/Expenses/expenses';
import Incomes from './components/Dashboard/Incomes/incomes';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  
  return (
    <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false  }} tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="statistique" component={Statistique} />
      <Tab.Screen name="expenses" component={Expenses} />
      <Tab.Screen name="incomes" component={Incomes} />
    </Tab.Navigator>
  )
}
