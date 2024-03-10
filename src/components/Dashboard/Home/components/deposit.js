import React, { useContext, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { insertIncome } from '../../../../../database';
import { myContext } from '../../../../../App'

const IncomeCategories = ['Salary', 'Bonuses', 'Commissions', 'Dividends', 'Interest Income', 'Rental Income',
  'Investment Income', 'Royalties', 'Pension or Retirement Income', 'Gifts and Inheritances', 'Others']

export default function Deposit({ toggleModalDeposit, setToggleModalDeposit,setIschange }) {
  const [source, setSource] = useState()
  const [amount, setAmount] = useState()
  const { lang } = useContext(myContext)
  const [error, setError] = useState(false)

  const deposit = async () => {
    try {
      if (!amount || !source || !amount.trim() ) {
        return setError(lang === 'eng' ? 'All fields are required.' : 'جميع الحقول مطلوبة.');
      }
      if (isNaN(parseFloat(amount)) || !/^\d+(\.\d+)?$/.test(amount.trim())) {
        return setError(lang === 'eng' ? 'Amount must be a number.' : 'المبلغ يجب أن يكون رقمًا.');
      }
      await insertIncome(source, amount );
      setError(""); setToggleModalDeposit(false)
      setIschange(amount)
    } catch (error) {
      console.log(error);
      setError(lang === 'eng' ? 'something wrong, please try late..' : 'هناك خطأ ما، يرجى المحاولة لاحقًا..');
    }
  };

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
      <View className="bg-gray-100 w-full min-h-[40vh] rounded-t-[30px]">
        <View className="flex items-center py-2">
          <View className="bg-[#bbb] h-1.5 w-20 rounded-xl" />
        </View>
        <View className="px-5 py-8">
          <Text className="text-lg font-bold text-gray-800">{lang === 'eng' ? 'How much did you receive?' : 'كم استلمت؟'}</Text>
          <TextInput onChangeText={(text) => setAmount(text)} keyboardType='number-pad' className="h-12 mt-3 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 text-sm text-left" placeholder='E.g., 500.00' placeholderTextColor="gray" />
          <Text className="mt-6 mb-3 text-lg font-bold text-gray-800">{lang === 'eng' ? 'In what manner did you acquire this?' : 'بأي طريقة اكتسبت هذا؟'}</Text>
          <ScrollView horizontal className="w-screen flex flex-row gap-3 pb-4">
            {IncomeCategories.map((item, index) => (
              <TouchableOpacity onPress={() => setSource(item)} key={index}
                className={`w-max px-6 py-2.5 border-2 border-red-600 rounded-lg ${source === item && 'bg-red-600'}`}>
                <Text className={`text-red-600 font-bold ${source === item && 'text-white'}`}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={deposit} className="mt-6 bg-red-600 py-2 rounded-2xl">
            <Text className="font-bold text-center text-white text-lg">{lang === 'eng' ? 'Deposit' : 'إيداع'}</Text>
          </TouchableOpacity>
          {error && <Text className="mt-2 text-sm text-center font-bold text-red-500">{error}</Text>}
        </View>
      </View>
    </Modal>
  )
}
