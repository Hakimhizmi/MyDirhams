import React, { useContext, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { langContext } from '../../../../../App'

export default function EditModal({ toggleModal, setToggleModal, loadingBtn }) {
    const { lang } = useContext(langContext)

    return (
        <Modal
            onBackdropPress={() => setToggleModal(false)}
            onBackButtonPress={() => setToggleModal(false)}
            isVisible={toggleModal}
            swipeDirection="down"
            onSwipeComplete={() => setToggleModal(false)}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationInTiming={700}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={500}
            className="flex justify-end m-0"
        >
            <View className="bg-gray-100 w-full min-h-[20vh] rounded-t-[30px]">
                <View className="flex items-center py-2">
                    <View className="bg-[#bbb] h-1.5 w-20 rounded-xl" />
                    <Text className="mt-4 text-2xl font-bold text-gray-800">{lang === 'eng' ? 'Change Username' : 'تصفية الخصائص'}</Text>
                </View>
                <View className="px-5 py-8">
                    <Text className="text-lg font-bold text-gray-800">{lang === 'eng' ? 'New username' : 'كم استلمت؟'}</Text>
                    <TextInput onChangeText={() => { }} className="h-12 mt-3 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 text-sm text-left" placeholder='E.g., Johnde' placeholderTextColor="gray" />

                    <TouchableOpacity onPress={() => { }} className="mt-6 bg-red-600 py-2 rounded-2xl">
                        <Text className="font-bold text-center text-white text-lg">
                            {loadingBtn ? lang === 'eng' ? 'Loading....' : 'جار التحميل....'
                                : lang === 'eng' ? 'Apply' : 'تطبيق التغييرات'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
