import React, { useContext, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-ui-datepicker';
import { langContext } from '../../../../../App'
import { format } from 'date-fns';

export default function IncomeFilter({ toggleModalFilter, setToggleModalFilter, filterbyDate, setDate, filterByCategorie, setSelectedCategorie, applyFilter, loadingBtn }) {
    const { lang } = useContext(langContext)


    const IncomeCategories = ['Salary', 'Bonuses', 'Commissions', 'Dividends', 'Interest Income', 'Rental Income',
        'Investment Income', 'Royalties', 'Pension or Retirement Income', 'Gifts and Inheritances', 'Others']

    return (
        <Modal
            onBackdropPress={() => setToggleModalFilter(false)}
            onBackButtonPress={() => setToggleModalFilter(false)}
            isVisible={toggleModalFilter}
            swipeDirection="down"
            onSwipeComplete={() => setToggleModalFilter(false)}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationInTiming={700}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={500}
            className="flex justify-end m-0"
        >
            <View className="bg-gray-100 w-full min-h-[50vh] rounded-t-[30px]">
                <View className="flex items-center py-2">
                    <View className="bg-[#bbb] h-1.5 w-20 rounded-xl" />
                    <Text className="mt-4 text-2xl font-bold text-gray-800">{lang === 'eng' ? 'Filter properties' : 'تصفية الخصائص'}</Text>
                    <Text className="mt-1 text-sm font-light text-gray-600">{lang === 'eng' ? 'Select properties that you want to see inside the table.' : 'اختر الخصائص التي ترغب في رؤيتها داخل الجدول.'}</Text>
                </View>
                <View className="px-5 py-8">
                    <Text className="mb-2 text-md font-bold text-gray-800">{lang === 'eng' ? 'Source' : 'المصدر'}</Text>
                    <ScrollView horizontal className="w-screen flex flex-row gap-3 pb-4">
                        {IncomeCategories.map((item, index) => (
                            <TouchableOpacity onPress={() => setSelectedCategorie(filterByCategorie === item ? null : item)} key={index}
                                className={`w-max px-6 py-2.5 border-2 border-red-600 rounded-lg ${filterByCategorie === item && 'bg-red-600'}`}>
                                <Text className={`text-red-600 font-bold ${filterByCategorie === item && 'text-white'}`}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text className="mt-4 mb-3 text-md font-bold text-gray-800">{lang === 'eng' ? 'Date' : 'تاريخ'}</Text>
                    <View className="p-1 bg-white border border-gray-300 rounded-xl">
                        <DateTimePicker
                            mode="single"
                            date={filterbyDate ? filterbyDate : undefined}
                            onChange={({ date }) => {
                                const selectedDate = new Date(date);
                                const filterDate = filterbyDate ? new Date(filterbyDate) : null;
                                if (filterDate && selectedDate.getTime() === filterDate.getTime()) {
                                    setDate(null);
                                } else {
                                    setDate(selectedDate);
                                }
                            }} selectedItemColor="#dc2626"
                            calendarTextStyle={{ color: "#1f2937" }}
                            headerTextStyle={{ color: "black" }}
                        />
                    </View>
                    <TouchableOpacity className="mt-6 bg-red-600 py-2 rounded-2xl">
                        <Text onPress={() => { !loadingBtn && applyFilter() }} className="font-bold text-center text-white text-lg">
                            {loadingBtn ? lang === 'eng' ? 'Loading....' : 'جار التحميل....'
                            : lang === 'eng' ? 'Apply' : 'تطبيق التغييرات'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
