import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { langContext } from '../../../../App'
import { Feather } from '@expo/vector-icons';

export default function ModalDelete({ toggleModalDelete, setToggleModalDelete, Delete }) {
    const { lang } = useContext(langContext)

    return (
        <Modal
            onBackdropPress={() => setToggleModalDelete(false)}
            onBackButtonPress={() => setToggleModalDelete(false)}
            isVisible={toggleModalDelete}
            swipeDirection="down"
            onSwipeComplete={() => setToggleModalDelete(false)}
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
                <View className="px-5 py-8 flex items-center">
                    <View className="bg-red-100 p-6 rounded-full">
                        <Feather name="alert-triangle" size={50} color="red" />
                    </View>
                    <Text className="mt-5 text-gray-800 font-bold text-3xl">{lang === 'eng' ? 'Are you sure?' : 'هل أنت متأكد؟'}</Text>
                    <Text className="mt-2 text-gray-500 font-bold text-lg text-center">{lang === 'eng' ? 'This action cannot be undone. All values associated with this field will be lost.' :
                        'لا يمكن التراجع عن هذا الإجراء. ستفقد جميع القيم المرتبطة بهذا الحقل.'}</Text>

                    <TouchableOpacity onPress={() => Delete()} className="mt-7 w-full bg-red-600 py-3 flex items-center rounded-lg">
                        <Text className="text-white font-semibold text-lg">{lang === 'eng' ? 'Delete Field' : 'حذف الحقل'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToggleModalDelete(false)} className="mt-4 w-full border border-gray-400 py-3 flex items-center rounded-lg">
                        <Text className="text-gray-700 font-semibold text-lg">{lang === 'eng' ? 'Cancel' : 'إلغاء'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
