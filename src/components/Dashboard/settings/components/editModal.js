import React, { useContext, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { langContext } from '../../../../../App'
import { SelectList } from 'react-native-dropdown-select-list';
import { updateUserInfo } from '../../../../../database';

export default function EditModal({ toggleModal, setToggleModal, edit, setIschange }) {
    const { lang, toogleLanguage } = useContext(langContext)
    const [loadingBtn, setloadingBtn] = useState()
    const [newValue, setNewValue] = useState(edit.value)
    const [error, setError] = useState(false)

    const update = async () => {
        if (!newValue || !newValue.trim()) {
            setError(lang === 'eng' ? 'Please enter a value to update.' : 'الرجاء إدخال قيمة للتحديث.');
            return;
        }
        setloadingBtn(true)
        updateUserInfo(edit.key, newValue).then((success) => {
            setloadingBtn(false)
            edit.key === 'lang' && toogleLanguage()
            setIschange(success)
            setToggleModal(false)
        }).catch((error) => setError('something went wrong!!'))
    }

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
                    <Text className="mt-4 text-2xl font-bold text-gray-800 capitalize">
                        {lang === 'eng'
                            ? `Change ${edit.key === 'lang' ? 'language' : edit.key}`
                            : `تغيير ${edit.key === 'username' ? 'اسم المستخدم' :
                                edit.key === 'balance' ? 'رصيد' :
                                    edit.key === 'currency' ? 'عُمْلَة' :
                                        edit.key === 'lang' && 'لغة'
                            }`
                        }
                    </Text>
                </View>
                <View className="px-5 py-8">
                    <Text className="mb-2 text-lg font-bold text-gray-800">
                        {lang === 'eng'
                            ? `${edit.key === 'lang' ? 'language' : edit.key}`
                            : `${edit.key === 'username' ? 'اسم المستخدم' :
                                edit.key === 'balance' ? 'رصيد' :
                                    edit.key === 'currency' ? 'عُمْلَة' :
                                        edit.key === 'lang' && 'لغة'
                            }`
                        }
                    </Text>
                    {edit.key === 'username' || edit.key === 'balance' ?
                        <TextInput onChangeText={(text) => setNewValue(text)} keyboardType={edit.key === 'balance' ? 'number-pad' : "text"} value={newValue} className="h-12 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 text-sm text-left" placeholder='E.g., Johnde' placeholderTextColor="gray" />
                        : edit.key === 'currency' ?
                            <SelectList
                                setSelected={(val) => setNewValue(val)}
                                data={[{ value: "mad" }, { value: "usd" }, { value: "euro" }]}
                                save="value"
                                boxStyles={{ backgroundColor: "white", borderColor: "#d1d5db", height: '13px' }}
                                dropdownStyles={{ backgroundColor: "white", borderColor: "#d1d5db" }}
                                dropdownTextStyles={{ color: "#111827", textTransform: "uppercase" }}
                                placeholder={lang === 'eng' ? "Please select a currency" : "يرجى اختيار عملة"}
                            />
                            :
                            <SelectList
                                setSelected={(val) => setNewValue(val === 'english' ? 'eng' : 'ar')}
                                data={[{ value: "english" },
                                { value: "العربية" }]}
                                save="value"
                                boxStyles={{ backgroundColor: "white", borderColor: "#d1d5db", height: '13px' }}
                                dropdownStyles={{ backgroundColor: "white", borderColor: "#d1d5db" }}
                                dropdownTextStyles={{ color: "#111827", textTransform: "uppercase" }}
                                placeholder={lang === 'eng' ? "Please select a language" : "يرجى اختيار لغة"}
                            />

                    }
                    {error && <Text className="mt-2 text-sm text-center font-bold text-red-500">{error}</Text>}

                    <TouchableOpacity onPress={() => { !loadingBtn && update() }} className="mt-6 bg-red-600 py-2 rounded-2xl">
                        <Text className="font-bold text-center text-white text-lg">
                            {loadingBtn ? lang === 'eng' ? 'Loading....' : 'جار التحميل....'
                                : lang === 'eng' ? 'Save Changes' : 'حفظ التغييرات'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToggleModal(false)} className="mt-4 w-full border border-gray-400 py-2 flex items-center rounded-2xl">
                        <Text className="text-gray-700 font-semibold text-lg">{lang === 'eng' ? 'Cancel' : 'إلغاء'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
