import React, { useContext, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list'
import { myContext } from '../../../../../App'
import { insertExpense } from '../../../../../database'


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

export default function Withdraw({ toggleModalWithdraw, setToggleModalWithdraw ,setIschange}) {
    const { lang } = useContext(myContext)
    const [title, setTitle] = useState()
    const [category, setCategory] = useState()
    const [amount, setAmount] = useState()
    const [error, setError] = useState(false)

    const withdraw = async () => {
        try {
            // Check if title, category, and amount are not empty
            if (!title || !category || !amount || !title.trim() || !amount.trim()) {
                return setError(lang === 'eng' ? 'All fields are required.' : 'جميع الحقول مطلوبة.');
            }
            if (isNaN(parseFloat(amount)) || !/^\d+(\.\d+)?$/.test(amount.trim())) {
                return setError(lang === 'eng' ? 'Amount must be a number.' : 'المبلغ يجب أن يكون رقمًا.');
              }
            await insertExpense(title, category, amount);
            setError(""); setToggleModalWithdraw(false)
            setIschange(amount)
        } catch (error) {
            console.log(error);
            setError(lang === 'eng' ? 'something wrong, please try late..' : 'هناك خطأ ما، يرجى المحاولة لاحقًا..');
        }
    };

    return (
        <Modal
            onBackdropPress={() => setToggleModalWithdraw(false)}
            onBackButtonPress={() => setToggleModalWithdraw(false)}
            isVisible={toggleModalWithdraw}
            swipeDirection="down"
            onSwipeComplete={() => setToggleModalWithdraw(false)}
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
                </View>
                <View className="px-5 py-8">
                    <Text className="text-lg font-bold text-gray-800">{lang === 'eng' ? 'What did you spend on ?' : 'على ماذا أنفقت؟'}</Text>
                    <TextInput onChangeText={(val) => setTitle(val)} className="h-12 mt-3 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 text-sm text-left" placeholder='E.g., furniture for home..' placeholderTextColor="gray" />
                    <Text className="mt-6 mb-3 text-lg font-bold text-gray-800">{lang === 'eng' ? 'Select category' : 'اختر الفئة'}</Text>
                    <SelectList
                        setSelected={(val) => setCategory(val)}
                        data={data}
                        save="value"
                        boxStyles={{ backgroundColor: "white", borderColor: "#d1d5db", height: '13px' }}
                        dropdownStyles={{ backgroundColor: "white", borderColor: "#d1d5db" }}
                        dropdownTextStyles={{ color: "#111827" }}
                        placeholder={lang === 'eng' ? "please select a category" : "الرجاء اختيار فئة"}
                    />
                    <Text className="mt-6 text-lg font-bold text-gray-800">{lang === 'eng' ? 'How much did you spend ?' : 'كم أنفقت؟'}</Text>
                    <TextInput onChangeText={(val) => setAmount(val)} keyboardType='number-pad' className="h-12 mt-3 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 text-sm text-left" placeholder='E.g., 500.00' placeholderTextColor="gray" />
                    
                    <TouchableOpacity onPress={withdraw} className="mt-6 bg-red-600 py-2 rounded-2xl">
                        <Text className="font-bold text-center text-white text-lg">{lang === 'eng' ? 'Withdraw' : 'سحب'} </Text>
                    </TouchableOpacity>
                    {error && <Text className="mt-2 text-sm text-center font-bold text-red-500">{error}</Text> }

                </View>
            </View>
        </Modal>
    )
}
