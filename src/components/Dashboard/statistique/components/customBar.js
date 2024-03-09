import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { langContext } from '../../../../../App'

export default function CustomBar({ state, navigation }) {
    const { lang } = useContext(langContext)

    return (
        <View className="bg-white pt-5 flex flex-row items-center justify-center border-b border-gray-300" >
            <TouchableOpacity onPress={() => navigation.jumpTo('expenses_statistique')} className={`px-10 py-4 ${state.index === 0 && 'border-b-2 border-black'}`}>
                <Text className="text-lg font-meduim">{lang === 'eng' ? 'Expenses' : 'النفقات'} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.jumpTo('income_statistique')} className={`px-10 py-4 ${state.index === 1 && 'border-b-2 border-black'}`}>
                <Text className="text-lg font-meduim">{lang === 'eng' ? 'Incomes' : 'الإيرادات'} </Text>
            </TouchableOpacity>
        </View>
    )
}
