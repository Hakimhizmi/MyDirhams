import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import IncomeFilter from './components/incomeFilter'
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function Incomes({navigation}) {
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
                <Text className="text-black font-extrabold text-2xl">lastest Incomes</Text>
                <Text className="mt-1 text-gray-600 text-lg">Last 30 Days</Text>
                <View className="py-8 flex flex-col gap-4 justify-center">
                    {Array.from({ length: 15 }, (_, index) => (
                        <View key={index} className="flex flex-row justify-between items-center">
                            <View className="flex flex-col justify-center">
                                <Text className="text-lg font-bold text-gray-900">Salary</Text>
                                <Text className="text-sm -mt-1 text-gray-700">18 oct 2023</Text>
                            </View>
                            <Text className="text-xl font-bold text-gray-900">$440.50</Text>
                        </View>
                    ))}
                </View>
            </View>

            <IncomeFilter toggleModalFilter={toggleModalFilter} setToggleModalFilter={setToggleModalFilter} />
        </ScrollView>
    )
}
