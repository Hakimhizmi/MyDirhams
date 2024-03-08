import React, { useContext, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { langContext } from '../../../App'

export default function Language({ navigation }) {
    const { lang, toogleLanguage } = useContext(langContext)

    return (
        <SafeAreaView className="h-screen flex justify-center relative">
            <View className='mb-14 -mt-14 flex items-center justify-center'>
                <FontAwesome name="language" size={100} color="#dc2626" />
            </View>
            <View className="px-8">
                <Text className="font-extrabold text-3xl">Choose</Text>
                <Text className="-mt-1 font-extrabold text-xl text-gray-500">Your Language</Text>
                <TouchableOpacity onPress={() => toogleLanguage()} className={`mt-7 bg-gray-100 border border-gray-300 px-5 py-4 rounded ${lang === 'ar' && 'border-red-500'}`}>
                    <Text className="text-xl font-black text-gray-800">مرحبا 👋</Text>
                    <Text className="mt-1 text-lg font-semibold text-gray-500">مرحبا بك في درهماتي</Text>
                    <Text className="mt-7 font-bold text-lg text-gray-800 text-left">العربية</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toogleLanguage()} className={`mt-7 bg-gray-100 border border-gray-300 px-5 py-4 rounded ${lang === 'eng' && 'border-red-500'}`}>
                    <Text className="text-xl font-black text-gray-800">Hi 👋</Text>
                    <Text className="mt-1 text-lg font-semibold text-gray-500">Welcome to MyDirhams</Text>
                    <Text className="mt-7 font-bold text-lg text-gray-800 text-right">English</Text>
                </TouchableOpacity>
            </View>

            <View className="flex px-8 flex-row justify-between items-center absolute bottom-2 w-full">
                <View className="flex flex-row gap-2">
                    <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
                    <View className="w-2.5 h-1.5 bg-red-600 rounded-full"></View>
                    <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
                    <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
                </View>
                <TouchableOpacity className="bg-red-600 px-8 py-2 rounded-3xl" onPress={() => navigation.jumpTo('info')}>
                    <Text className="text-lg font-bold text-white">{lang === 'eng' ? 'Next' : 'التالي'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
