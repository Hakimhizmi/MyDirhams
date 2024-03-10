import React, { useContext, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { myContext } from '../../../../../App'
import { Entypo } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export default function ModalEmail({ toggleModalEmail, setToggleModalEmail }) {
    const { lang } = useContext(myContext)
    const [iscopy, setIscopy] = useState(false)

    const handleCopyText = async () => {
        try {
            await Clipboard.setStringAsync('hizmi.abdelhakim@gmail.com');
            setIscopy(true)
        } catch (error) {
            console.error('Error copying text to clipboard:', error);
        }
    };
    return (
        <Modal
            onBackdropPress={() => setToggleModalEmail(false)}
            onBackButtonPress={() => setToggleModalEmail(false)}
            isVisible={toggleModalEmail}
            swipeDirection="down"
            onSwipeComplete={() => setToggleModalEmail(false)}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationInTiming={700}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={500}
            className="flex justify-end m-0"
        >
            <View className="bg-gray-100 w-full min-h-[30vh] rounded-t-[30px]">
                <View className="flex items-center py-2">
                    <View className="bg-[#bbb] h-1.5 w-20 rounded-xl" />
                </View>
                <View className="px-5 py-8 flex items-center">
                    <Text className="text-gray-800 font-bold text-3xl">{lang === 'eng' ? 'Contact Us' : 'اتصل بنا'}</Text>
                    <Text className="mt-2 text-gray-500 font-bold text-lg text-center">{lang === 'eng' ?
                        'This email is an invitation for you to contact us and share your thoughts on the application. We value your feedback and look forward to hearing from you.' :
                        'هذا البريد الإلكتروني دعوة للتواصل معنا ومشاركة آرائك حول التطبيق. نقدر ملاحظاتك ونتطلع إلى الاستماع منك.'}</Text>
                    <View className="mt-6 mb-3 w-full flex flex-row items-center bg-slate-200 pl-4 rounded-xl">
                        <View className="flex flex-row space-x-4 items-center">
                            <View className="border-r border-slate-400 pr-4">
                                <Entypo name="email" size={18} color="black" />
                            </View>
                            <Text className="text-black/80 font-bold">hizmi.abdelhakim@gmail.com</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleCopyText()} className="bg-blue-600 px-6 py-4 ml-auto rounded-r-xl">
                            <Text className="text-white">
                                {iscopy ? (lang === 'eng' ? 'copied!' : 'تم النسخ') : (lang === 'eng' ? 'Copy' : 'نسخ')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
