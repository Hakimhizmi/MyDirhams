import React, { useState } from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import deposit from '../../../../assets/svg/deposit.png'
import withdraw from '../../../../assets/svg/withdraw.png'
import savemoney from '../../../../assets/svg/savemoney.png'
import Deposit from './components/deposit'
import Withdraw from './components/withdraw'

export default function Home() {
  const [toggleModalDeposit,setToggleModalDeposit] = useState(false)
  const [toggleModalWithdraw,setToggleModalWithdraw] = useState(false)

  return (
    <ScrollView className="h-screen">
      <ImageBackground  source={require('../../../../assets/images/gradienta.jpg')} className="bg-red-100 object-cover">
        <View className="px-4 pt-10 flex flex-row justify-between">
          <Text className="text-meduim text-lg text-gray-900">Hello, <Text className="font-bold text-xl italic text-black">Hakim</Text></Text>
        </View>
        <View className="py-16 flex flex-col gap-3 items-center justify-center">
          <Text className="text-xl font-bold text-gray-800">Availiable balance</Text>
          <Text className="text-6xl font-black text-black">$5,689.00</Text>
        </View>

        <View className="bg-white rounded-[70px] h-full px-7 pt-7">
          <Text className="text-2xl font-bold text-gray-900">Services</Text>
          <View className="px-4 py-6 flex flex-row gap-12">
            <TouchableOpacity className="flex flex-col gap-1 items-center" onPress={()=>setToggleModalDeposit(true)}>
              <View className="bg-purple-100 p-4 rounded-full">
                <Image source={deposit} alt='deposit' className="w-8 h-8" />
              </View>
              <Text className="text-lg font-semibold text-gray-900">Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-col gap-1 items-center" onPress={()=>setToggleModalWithdraw(true)}>
              <View className="bg-blue-100 p-4 rounded-full">
                <Image source={withdraw} alt='deposit' className="w-8 h-8" />
              </View>
              <Text className="text-lg font-semibold text-gray-900">Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-col gap-1 items-center">
              <View className="bg-orange-100 p-4 rounded-full">
                <Image source={savemoney} alt='deposit' className="w-8 h-8" />
              </View>
              <Text className="text-lg font-semibold text-gray-900">Save Money</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold text-gray-900">This Week</Text>

            <View className="py-4 flex flex-col gap-4 justify-center">
              {Array.from({ length: 15 }, (_, index) => (
                <View key={index} className="flex flex-row justify-between items-center">
                  <View className="flex flex-row gap-3">
                    <View className="bg-black/90 rounded-xl p-3">
                      <Image source={require('../../../../assets/svg/food.png')} alt='deposit' className="w-6 h-6" />
                    </View>
                    <View className="flex flex-col justify-center">
                      <Text className="text-lg font-bold text-gray-900">Ikea {index === 14 && "dd"}</Text>
                      <Text className="text-sm -mt-1 text-gray-700">at 18 oct 10:10</Text>
                    </View>
                  </View>
                  <Text className="text-xl font-bold text-gray-900">-$289.50</Text>
                </View>
              ))}
            </View>
        </View>
      </ImageBackground>

      <Deposit toggleModalDeposit={toggleModalDeposit} setToggleModalDeposit={setToggleModalDeposit} />
      <Withdraw toggleModalWithdraw={toggleModalWithdraw} setToggleModalWithdraw={setToggleModalWithdraw} />

    </ScrollView>
  )
}
