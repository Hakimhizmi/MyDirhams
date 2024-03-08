import React, { useContext } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import vectorFinance from '../../../assets/svg/vectorFinance.png'
import { langContext } from '../../../App'

export default function Info({ navigation }) {
  const { lang } = useContext(langContext)

  return (
    <SafeAreaView className="h-screen flex justify-center relative">
        <View className='mb-24 flex items-center justify-center'>
          <Image source={vectorFinance} alt='logo' className="w-max object-cover" />
          <Text className="mt-3 text-xl text-gray-900 font-semibold" >{lang === 'eng' ? 'Simple Money Management' : 'تنظيم الأمور المالية بطريقة بسيطة'}</Text>
          <Text className="text-gray-500 text-lg text-center">
            {lang === 'eng' ? ' A Simple expense tracker that makes managing expenses easy.' : 'متتبع مصاريف بسيط يجعل إدارة المصاريف سهلة.'}
          </Text>
        </View>
        <View className="flex px-8 flex-row justify-between items-center absolute bottom-2 w-full">
          <View className="flex flex-row gap-2">
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-red-600 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
          </View>
          <TouchableOpacity className="bg-red-600 px-8 py-2 rounded-3xl" onPress={() => navigation.jumpTo('register')}>
            <Text className="text-lg font-bold text-white">{lang === 'eng' ? 'Next' : 'التالي'}</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
