import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import vectorFinance from '../../../assets/svg/vectorFinance.png'

export default function Info({navigation}) {
  return (
    <SafeAreaView >
    <View className="h-screen bg-gray-50 flex justify-center relative">
      <View className='mb-24 flex items-center justify-center'>
        <Image source={vectorFinance} alt='logo' className="w-max object-cover" />
        <Text className="mt-3 text-xl text-gray-900 font-semibold" >Simple Money Management</Text>
        <Text className="text-gray-500 text-lg text-center">A Simple expense tracker that makes
managing expenses easy.</Text>
      </View>
      <View className="flex px-8 flex-row justify-between items-center absolute bottom-16 w-full">
          <View className="flex flex-row gap-2">
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-red-600 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
          </View>
          <TouchableOpacity className="bg-red-600 px-8 py-2 rounded-3xl" onPress={()=> navigation.jumpTo('register')}>
            <Text className="text-lg font-bold text-white">Next</Text>
          </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  )
}
