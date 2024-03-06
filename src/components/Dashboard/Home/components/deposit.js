import React, { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-ui-datepicker';
import { format } from 'date-fns';

export default function Deposit({ toggleModalDeposit, setToggleModalDeposit }) {
  const [date, setDate] = useState(new Date())
  const [selectedCategorie, setSelectedCategorie] = useState()

  console.log(format(new Date(date), 'yyyy-MM-dd'));

  const IncomeCategories = ['Salary', 'Bonuses', 'Commissions', 'Dividends', 'Interest Income', 'Rental Income',
    'Investment Income', 'Royalties', 'Pension or Retirement Income', 'Gifts and Inheritances', 'Others']

  return (
    <Modal
      onBackdropPress={() => setToggleModalDeposit(false)}
      onBackButtonPress={() => setToggleModalDeposit(false)}
      isVisible={toggleModalDeposit}
      swipeDirection="down"
      onSwipeComplete={() => setToggleModalDeposit(false)}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationInTiming={700}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      className="flex justify-end m-0"
    >
      <View className="bg-gray-100 w-full min-h-[60vh] rounded-t-[30px]">
        <View className="flex items-center py-2">
          <View className="bg-[#bbb] h-1.5 w-20 rounded-xl" />
        </View>
        <View className="px-5 py-8">
          <Text className="text-lg font-bold text-gray-800">How much did you receive?</Text>
          <TextInput keyboardType='number-pad' className="h-12 mt-3 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 text-sm text-left" placeholder='E.g., 500.00' placeholderTextColor="gray" />
          <Text className="mt-6 mb-3 text-lg font-bold text-gray-800">In what manner did you acquire this?</Text>
          <ScrollView horizontal className="w-screen flex flex-row gap-3 pb-4">
            {IncomeCategories.map((item, index) => (
              <TouchableOpacity onPress={() => setSelectedCategorie(item)} key={index} 
              className={`w-max px-6 py-2.5 border-2 border-red-600 rounded-lg ${selectedCategorie === item && 'bg-red-600'}`}>
                <Text className={`text-red-600 font-bold ${selectedCategorie === item && 'text-white'}`}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text className="mt-2 text-lg font-bold text-gray-800">Receive date</Text>
          <View className="mt-3 px-2 py-2 bg-white border border-gray-300 rounded-xl">
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
            <Text className="font-bold text-center text-white text-lg">Deposit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
