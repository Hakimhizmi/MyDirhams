import React, { useContext, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from 'react-native-ui-datepicker';
import { langContext } from '../../../../../App'

export default function ExpenceFilter({ toggleModalFilter, setToggleModalFilter, filterbyDate, setDate, filterByCategorie, setSelectedCategorie, applyFilter }) {
    const { lang } = useContext(langContext)

    const data = [
        { key: '2', value: 'Housing' },
        { key: '3', value: 'Transportation' },
        { key: '5', value: 'Food' },
        { key: '6', value: 'Healthcare' },
        { key: '7', value: 'Clothing and Personal Care' },
        { key: '8', value: 'Education' },
        { key: '9', value: 'Utilities' },
        { key: '10', value: 'Insurance' },
        { key: '11', value: 'Savings and Investments' },
        { key: '12', value: 'Gifts and Donations' },
        { key: '13', value: 'Others' },
    ]

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
                    <Text className="mb-3 text-md font-bold text-gray-800">{lang === 'eng' ? 'Date' : 'تاريخ'}</Text>
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
                            }}
                            selectedItemColor="#dc2626"
                            calendarTextStyle={{ color: "#1f2937" }}
                            headerTextStyle={{ color: "black" }}
                        />
                    </View>
                    <Text className="mt-4 mb-2 text-md font-bold text-gray-800">{lang === 'eng' ? 'Category' : 'الفئة'}</Text>
                    <SelectList
                        setSelected={(val) => setSelectedCategorie(val)}
                        data={data}
                        value={filterByCategorie}
                        save="value"
                        boxStyles={{ backgroundColor: "white", borderColor: "#d1d5db", height: '11px' }}
                        dropdownStyles={{ backgroundColor: "white", borderColor: "#d1d5db" }}
                        dropdownTextStyles={{ color: "#111827" }}
                        placeholder={lang === 'eng' ? 'please select a category' : 'الرجاء اختيار فئة'}
                    />
                    <TouchableOpacity onPress={() => applyFilter()} className="mt-6 bg-red-600 py-2 rounded-2xl">
                        <Text className="font-bold text-center text-white text-lg">{lang === 'eng' ? 'Apply' : 'تطبيق التغييرات'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
