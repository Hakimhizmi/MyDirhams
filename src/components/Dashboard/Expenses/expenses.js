import React, { useCallback, useContext, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import ExpenceFilter from './components/expenceFilter'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getExpenses } from '../../../../database';
import { format, isValid } from 'date-fns';
import {langContext} from '../../../../App'


export default function Expenses({ navigation }) {
    const [toggleModalFilter, setToggleModalFilter] = useState(false)
    const [expences, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const { lang } = useContext(langContext)

    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                try {
                    const Expenses = await getExpenses();
                    setExpenses(Expenses)
                    setLoading(false)
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            fetchData();
        }, [])
    );
    return (
        loading ?
            <View className="h-screen bg-white flex items-center justify-center">
                <Image source={require('../../../../assets/gif/loader.gif')} className="w-64" />
            </View>
            :
            <ScrollView className="h-screen bg-white px-5 py-6">
                <View className="flex flex-row justify-between">
                    <TouchableOpacity onPress={() => navigation.jumpTo('home')} className="py-2 px-2.5 border border-gray-400 rounded-lg flex items-center justify-center">
                        <Ionicons name="chevron-back" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToggleModalFilter(true)} className="py-2 px-4 border border-gray-400 rounded-lg flex flex-row space-x-1 items-center justify-center">
                        <Text className="text-gray-900 font-bold" >{lang === "eng" ? 'Filtre by' : 'تصفية حسب'}</Text>
                        <Entypo name="chevron-small-down" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View className="pt-8">
                    <Text className="text-black font-extrabold text-2xl">{lang === 'eng' ? 'Recent Expenses' : 'النفقات الأخيرة'}</Text>
                    <Text className="mt-1 text-gray-600 text-lg">{lang === 'eng' ? 'Swipe to left to edit and right to delete' : 'اسحب إلى اليسار لتعديل وإلى اليمين لحذف'}</Text>
                    <View className="py-8 flex flex-col gap-4 justify-center">
                        {expences.length > 0 ?
                            expences.map((item, index) => (
                                <View key={index} className="flex flex-row justify-between items-center">
                                    <View className="flex flex-row gap-3">
                                        <View className="bg-black/90 rounded-xl p-3">
                                            <Image source={require('../../../../assets/svg/food.png')} alt='deposit' className="w-6 h-6" />
                                        </View>
                                        <View className="flex flex-col justify-center">
                                            <Text className="text-lg font-bold text-gray-900">{item?.title || 'xxxx'}</Text>
                                            <Text className="text-sm -mt-1 text-gray-700">
                                            {isValid(new Date(item.date)) && format(new Date(item.date), 'dd MMM yyyy \'at\' HH:mm')}</Text>
                                        </View>
                                    </View>
                                    <Text className="text-xl font-bold text-gray-900">${item?.amount || 'xxxx'}</Text>
                                </View>
                            )) :
                            ""
                        }
                    </View>
                </View>

                <ExpenceFilter toggleModalFilter={toggleModalFilter} setToggleModalFilter={setToggleModalFilter} />
            </ScrollView>
    )
}
