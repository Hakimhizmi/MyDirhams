import React, { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from 'react-native-ui-datepicker';

export default function IncomeFilter({ toggleModalFilter, setToggleModalFilter }) {
    const [selected, setSelected] = useState("");
    const [date, setDate] = useState(new Date());
    const [selectedCategorie, setSelectedCategorie] = useState()


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
                    <Text className="mt-4 text-2xl font-bold text-gray-800">Filter properties</Text>
                    <Text className="mt-1 text-sm font-light text-gray-600">Select properties that you want to see inside the table.</Text>
                </View>
                <View className="px-5 py-8">
                <Text className="mb-2 text-md font-bold text-gray-800">Category</Text>
                    <ScrollView horizontal className="w-screen flex flex-row gap-3 pb-4">
                        {IncomeCategories.map((item, index) => (
                            <TouchableOpacity onPress={() => setSelectedCategorie(selectedCategorie === item ? null : item)} key={index}
                                className={`w-max px-6 py-2.5 border-2 border-red-600 rounded-lg ${selectedCategorie === item && 'bg-red-600'}`}>
                                <Text className={`text-red-600 font-bold ${selectedCategorie === item && 'text-white'}`}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text className="mt-4 mb-3 text-md font-bold text-gray-800">Date</Text>
                    <View className="p-1 bg-white border border-gray-300 rounded-xl">
                        <DateTimePicker
                            mode="single"
                            date={date}
                            onChange={({ date }) => setDate(new Date(date))}
                            selectedItemColor="#dc2626"
                            calendarTextStyle={{ color: "#1f2937" }}
                            headerTextStyle={{ color: "black" }}
                        />
                    </View>
                    <TouchableOpacity className="mt-6 bg-red-600 py-2 rounded-2xl">
                        <Text className="font-bold text-center text-white text-lg">Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
