import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from 'react-native-ui-datepicker';

export default function ExpenceFilter({ toggleModalFilter, setToggleModalFilter }) {
    const [selected, setSelected] = useState("");
    const [date, setDate] = useState(new Date());

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
                    <Text className="mt-4 text-2xl font-bold text-gray-800">Filter properties</Text>
                    <Text className="mt-1 text-sm font-light text-gray-600">Select properties that you want to see inside the table.</Text>
                </View>
                <View className="px-5 py-8">
                    <Text className="mb-3 text-md font-bold text-gray-800">Date</Text>
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
                    <Text className="mt-4 mb-2 text-md font-bold text-gray-800">Category</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                        boxStyles={{ backgroundColor: "white", borderColor: "#d1d5db", height: '11px' }}
                        dropdownStyles={{ backgroundColor: "white", borderColor: "#d1d5db" }}
                        dropdownTextStyles={{ color: "#111827" }}
                        placeholder="please select a category"
                    />
                    <TouchableOpacity className="mt-6 bg-red-600 py-2 rounded-2xl">
                        <Text className="font-bold text-center text-white text-lg">Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
