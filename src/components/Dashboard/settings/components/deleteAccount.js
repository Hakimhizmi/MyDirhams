import React, { useContext, useState } from 'react'
import { NativeModules, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { langContext } from '../../../../../App'
import { Feather } from '@expo/vector-icons';
import { deleteAccount } from '../../../../../database'

export default function DeleteAccount({ toggleModalDelete, setToggleModalDelete , navigation }) {
    const { lang } = useContext(langContext)
    const [loadingBtn, setloadingBtn] = useState()

    const Delete_Account = async () => {
        setloadingBtn(true)
        deleteAccount().then(() => {
            setloadingBtn(false)
            NativeModules.DevSettings.reload();
        }).catch((error) => console.log('Error fetching:', error))
    }
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
                    <Text className="mt-2 text-gray-500 font-bold text-lg text-center">{lang === 'eng' ? 
                    'This action is irreversible, and all data will be permanently lost.' :
                        'هذا الإجراء لا يمكن التراجع عنه، وسيتم فقدان جميع البيانات بشكل دائم.'}</Text>

                    <TouchableOpacity onPress={() => { !loadingBtn && Delete_Account() }} className="mt-7 w-full bg-red-600 py-3 flex items-center rounded-lg">
                        <Text className="text-white font-semibold text-lg">
                            {loadingBtn ? lang === 'eng' ? 'Loading....' : 'جار التحميل....'
                                : lang === 'eng' ? 'Delete Account' : 'حذف الحساب'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToggleModalDelete(false)} className="mt-4 w-full border border-gray-400 py-3 flex items-center rounded-lg">
                        <Text className="text-gray-700 font-semibold text-lg">{lang === 'eng' ? 'Cancel' : 'إلغاء'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

