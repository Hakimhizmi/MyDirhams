import React, { useCallback, useContext, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import IncomeFilter from './components/incomeFilter'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { langContext } from '../../../../App'
import { useFocusEffect } from '@react-navigation/native';
import { getExpensesOrIncomes } from '../../../../database';
import { format, isValid } from 'date-fns';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Incomes({ navigation }) {
    const [toggleModalFilter, setToggleModalFilter] = useState(false)
    const [incomes, setIncomes] = useState([])
    const [currency, setCurrency] = useState()
    const [loading, setLoading] = useState(true)
    const { lang } = useContext(langContext)
    const [filterbyDate, setDate] = useState(null);
    const [filterByCategorie, setSelectedCategorie] = useState(null)

    async function fetchData(d = null, c = null) {
        try {
            const response = await getExpensesOrIncomes('income', d, c);
            setIncomes(response.data); setCurrency(response.currency)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    async function applyFilter() {
        await fetchData(filterbyDate,filterByCategorie)
        setToggleModalFilter(false)
    }
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
                    <Text className="text-black font-extrabold text-2xl">{lang === 'eng' ? 'lastest Incomes' : 'أحدث الإيرادات'}</Text>
                    <Text className="mt-1 text-gray-600 text-lg">{lang === 'eng' ? 'Swipe to left to edit and right to delete' : 'اسحب إلى اليسار لتعديل وإلى اليمين لحذف'}</Text>
                    <View className="py-8 flex flex-col gap-4 justify-center">
                        {incomes.length > 0 ?
                            incomes.map((income, index) => (
                                <View key={index} className="flex flex-row justify-between items-center">
                                    <View className="flex flex-col justify-center">
                                        <Text className="text-lg font-bold text-gray-900 capitalize">{income?.source || 'xxxx'}</Text>
                                        <Text className="text-sm -mt-1 text-gray-700">
                                            {isValid(new Date(income.date)) && format(new Date(income.date), 'dd MMM yyyy \'at\' HH:mm')}
                                        </Text>
                                    </View>
                                    <Text className="text-xl font-bold text-gray-900 uppercase">{income?.amount || 'xxxx'} {currency}</Text>
                                </View>
                            )) :
                            <View className="py-44 flex items-center justify-center">
                                <SimpleLineIcons name="doc" size={60} color="#959da6" />
                                <Text className="mt-2 text-gray-400/80 font-light text-xl">{lang === 'eng' ? 'No income are available.' : 'لا توجد أية إيرادات متاحة.'}</Text>
                            </View>}
                    </View>
                </View>

                <IncomeFilter toggleModalFilter={toggleModalFilter} setToggleModalFilter={setToggleModalFilter} filterbyDate={filterbyDate} setDate={setDate}
                    filterByCategorie={filterByCategorie} setSelectedCategorie={setSelectedCategorie} applyFilter={applyFilter}/>
            </ScrollView>
    )
}
