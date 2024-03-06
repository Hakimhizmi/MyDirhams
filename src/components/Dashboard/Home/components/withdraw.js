import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list'

export default function Withdraw({ toggleModalWithdraw, setToggleModalWithdraw }) {
    const [selected, setSelected] = useState("");

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
                    <Text className="text-lg font-bold text-gray-800">What did you spend on ?</Text>
                    <TextInput className="h-12 mt-3 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 text-sm text-left" placeholder='E.g., furniture for home..' placeholderTextColor="gray" />
                    <Text className="mt-6 mb-3 text-lg font-bold text-gray-800">Select category</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                        boxStyles={{backgroundColor : "white" , borderColor : "#d1d5db" , height : '13px'}}
                        dropdownStyles={{backgroundColor : "white" , borderColor : "#d1d5db"  }}
                        dropdownTextStyles={{color:"#111827"}}
                        placeholder="please select a category"
                    />
                    <Text className="mt-6 text-lg font-bold text-gray-800">How much did you spend ?</Text>
                    <TextInput keyboardType='number-pad' className="h-12 mt-3 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 text-sm text-left" placeholder='E.g., 500.00' placeholderTextColor="gray" />

                    <TouchableOpacity className="mt-6 bg-red-600 py-2 rounded-2xl">
                        <Text className="font-bold text-center text-white text-lg">Withdraw</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
