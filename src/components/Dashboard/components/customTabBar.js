import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FontAwesome, Fontisto, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function CustomTabBar({ state, navigation }) {
  return (
    <View className="bg-white py-2 flex space-x-4 flex-row items-center justify-center">
      <TouchableOpacity onPress={() => navigation.jumpTo('home')} className={`p-3 rounded-2xl ${state.index === 0 && 'bg-black'}`}>
        <FontAwesome name="home" size={25} color={`${state.index === 0 ? 'white' : 'black'}`} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.jumpTo('statistique')} className={`p-3 rounded-2xl ${state.index === 1 && 'bg-black'}`}>
        <FontAwesome name="pie-chart" size={25} color={`${state.index === 1 ? 'white' : 'black'}`} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.jumpTo('expenses')} className={`p-3 rounded-2xl ${state.index === 2 && 'bg-black'}`}>
        <Fontisto name="wallet" size={25} color={`${state.index === 2 ? 'white' : 'black'}`} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.jumpTo('incomes')} className={`p-3 rounded-2xl ${state.index === 3 && 'bg-black'}`}>
        <MaterialCommunityIcons name="wallet-plus" size={25} color={`${state.index === 3 ? 'white' : 'black'}`} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.jumpTo('home')} className={`p-3 rounded-2xl ${state.index === 4 && 'bg-black'}`}>
        <Ionicons name="settings" size={25} color={`${state.index === 4 ? 'white' : 'black'}`} />
      </TouchableOpacity>
    </View>
  )
}
