import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome, Fontisto, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function CustomBar({ state, navigation }) {
    return (
        <View className="bg-white pt-5 flex flex-row items-center justify-center border-b border-gray-300" >
            <TouchableOpacity onPress={() => navigation.jumpTo('expenses_statistique')} className={`px-10 py-4 ${state.index === 0 && 'border-b-2 border-black'}`}>
                <Text className="text-lg font-meduim">Expenses</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.jumpTo('income_statistique')} className={`px-10 py-4 ${state.index === 1 && 'border-b-2 border-black'}`}>
                <Text className="text-lg font-meduim">Incomes</Text>
            </TouchableOpacity>
        </View>
    )
}
