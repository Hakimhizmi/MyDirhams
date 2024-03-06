import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import ExpenceFilter from './components/expenceFilter'
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function Expenses({ navigation }) {
    const [toggleModalFilter, setToggleModalFilter] = useState(false)

    return (
        <ScrollView className="h-screen bg-white px-5 py-6">
            <View className="flex flex-row justify-between">
                <TouchableOpacity onPress={() => navigation.jumpTo('home')} className="py-2 px-2.5 border border-gray-400 rounded-lg flex items-center justify-center">
                    <Ionicons name="chevron-back" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setToggleModalFilter(true)} className="py-2 px-4 border border-gray-400 rounded-lg flex flex-row space-x-1 items-center justify-center">
                    <Text className="text-gray-900 font-bold" >Filtre by </Text>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View className="pt-8">
                <Text className="text-black font-extrabold text-2xl">Recent Expenses</Text>
                <Text className="mt-1 text-gray-600 text-lg">Last 30 Days</Text>
                <View className="py-8 flex flex-col gap-4 justify-center">
                    {Array.from({ length: 15 }, (_, index) => (
                        <View key={index} className="flex flex-row justify-between items-center">
                            <View className="flex flex-row gap-3">
                                <View className="bg-black/90 rounded-xl p-3">
                                    <Image source={require('../../../../assets/svg/food.png')} alt='deposit' className="w-6 h-6" />
                                </View>
                                <View className="flex flex-col justify-center">
                                    <Text className="text-lg font-bold text-gray-900">Ikea {index === 14 && "gg"}</Text>
                                    <Text className="text-sm -mt-1 text-gray-700">18 oct 2023 at 16:05</Text>
                                </View>
                            </View>
                            <Text className="text-xl font-bold text-gray-900">$289.50</Text>
                        </View>
                    ))}
                </View>
            </View>

            <ExpenceFilter toggleModalFilter={toggleModalFilter} setToggleModalFilter={setToggleModalFilter} />
        </ScrollView>
    )
}
