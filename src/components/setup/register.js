import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SwitchSelector from "react-native-switch-selector";
import Svg from '../../../assets/svg/setupac.png'

export default function Register() {
  const [currency, setCurrency] = useState('mad')

  return (
    <SafeAreaView>
      <View className="h-screen bg-gray-50 flex justify-center relative">
        <View  className='mb-16 px-5 flex gap-4 justify-center'>
          <Image source={Svg} alt='logo' className="w-16 h-16" />
          <Text className="mt-3 text-4xl text-gray-900 font-semibold" >Set up your MD account</Text>
          <View className="bg-red-600 px-5 py-4 rounded-b-3xl rounded-tr-3xl">
            <Text className="text-white text-sm">Establish your account effortlessly with no charges involved, and experience the convenience of an entirely
              offline setup on your personal device.</Text>
          </View>
        </View>
        <View className="mb-24 flex flex-col gap-6 px-5">
          <View className="px-5 pt-2 border border-gray-300/60 rounded-2xl">
            <Text className="text-sm text-gray-600 ml-1">Username</Text>
            <TextInput className="h-9 text-gray-900 text-sm text-left" placeholder='E.g., JohnDoe123' placeholderTextColor="gray" />
          </View>
          <View className="px-5 pt-2 border border-gray-300/60 rounded-2xl">
            <Text className="text-sm text-gray-600 ml-1">Amount</Text>
            <TextInput keyboardType='number-pad' className="h-9 text-gray-900 text-sm text-left" placeholder='E.g., 500.00' placeholderTextColor="gray" />
          </View>
          <View className="px-1">
            <SwitchSelector
              initial={0} textColor="#dc2626" selectedColor="white" buttonColor="#dc2626" borderColor="#d1d5db" valuePadding={2.5} height={50}
              bold hasPadding backgroundColor="#f9fafb" borderRadius={20}
              options={[
                { label: "MAD", value: "mad" },
                { label: "USD", value: "usd" },
                { label: "EURO", value: "euro" }
              ]}
              testID="currency-switch-selector" accessibilityLabel="currency-switch-selector"
              onPress={value => setCurrency(value)}

            />
          </View>
        </View>
        <View className="flex px-8 flex-row justify-between items-center absolute bottom-16 w-full">
          <View className="flex flex-row gap-2">
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
            <View className="w-2.5 h-1.5 bg-red-600 rounded-full"></View>
          </View>
          <TouchableOpacity className="bg-red-600 px-8 py-2 rounded-3xl">
            <Text className="text-lg font-bold text-white">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

