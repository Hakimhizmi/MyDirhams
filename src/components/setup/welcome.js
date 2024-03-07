import React, { useContext } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Logo from '../../../assets/images/logo.png'
import { langContext } from '../../../App'

export default function Welcome({ navigation }) {
  const { lang } = useContext(langContext)

  return (
    <SafeAreaView >
      <View className="h-screen bg-gray-50 flex justify-center relative">
        <View className='mb-14 flex items-center justify-center'>
          <Image source={Logo} alt='logo' className="w-40 h-40" />
          <Text className="mt-3 text-5xl text-black font-semibold">{lang === 'eng' ? (<Text>My<Text className="font-light">Dirhams</Text></Text>) : 'درهماتي'}</Text>
        </View>
        <View className="flex px-8 flex-row justify-between items-center absolute bottom-16 w-full">
          <View className="flex flex-row gap-2">
            <View className="w-2.5 h-1.5 bg-red-600 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
          </View>
          <TouchableOpacity className="bg-red-600 px-8 py-2 rounded-3xl" onPress={() => navigation.jumpTo('language')}>
            <Text className="text-lg font-bold text-white">{lang === 'eng' ? 'Next' : 'التالي'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
