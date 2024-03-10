import React, { useCallback, useContext, useState } from 'react'
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { langContext } from '../../../../App'
import { Ionicons, FontAwesome, MaterialIcons, Entypo, AntDesign, Octicons } from '@expo/vector-icons';
import { getUserData } from '../../../../database';
import { useFocusEffect } from '@react-navigation/native';
import EditModal from './components/editModal';
import DeleteAccount from './components/deleteAccount';

export default function Settings({ navigation }) {
    const { lang } = useContext(langContext)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [toggleModal, setToggleModal] = useState(false)
    const [edit, setEdit] = useState({ key: "", value: "" })
    const [isChange, setIschange] = useState()
    const [toggleModalDelete, setToggleModalDelete] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setLoading(true)
            getUserData().then((data) => setUserData(data))
                .catch((error) => console.error('Error fetching:', error))
                .finally(() => setLoading(false))
        }, [isChange])
    );

    const handlRedirect = (url) => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.error("Don't know how to open URI: " + emailUrl);
            }
        });
    };

    return (
        loading ?
            <View className="h-screen bg-white flex items-center justify-center">
                <Image source={require('../../../../assets/gif/loader.gif')} className="w-64" />
            </View>
            :
            <ScrollView className="h-screen bg-white px-5 py-6" >
                <View className="flex flex-row justify-between pt-2">
                    <TouchableOpacity onPress={() => navigation.jumpTo('home')} className="py-2 px-2.5 border border-gray-400 rounded-lg flex items-center justify-center">
                        <Ionicons name="chevron-back" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View className="pt-7">
                    <Text className="text-black font-extrabold text-4xl">{lang === 'eng' ? 'Settings' : 'الإعدادات'}</Text>

                    <View className="mt-9">
                        <Text className="text-black font-bold text-md text-gray-900">{lang === 'eng' ? 'General' : 'إعدادات عامة'}</Text>
                        <View className="mt-2 bg-slate-100 rounded-xl border border-slate-300">
                            <TouchableOpacity onPress={() => {
                                setEdit({ key: "username", value: userData?.username })
                                setToggleModal(true)
                            }}
                                className="p-4 flex flex-row justify-between items-center border-b border-slate-300">
                                <View className="flex flex-row space-x-2 items-center">
                                    <FontAwesome name="user-o" size={20} color="#334155" />
                                    <Text className="text-lg font-extrabold">{lang === 'eng' ? 'username' : 'اسم المستخدم'}</Text>
                                </View>
                                <View className="flex flex-row space-x-1 items-center">
                                    <Text className="text-sm font-bold text-gray-500">{userData?.username || 'N/A'}</Text>
                                    <MaterialIcons name="navigate-next" size={25} color="#334155" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setEdit({ key: "balance", value: userData?.balance })
                                setToggleModal(true)
                            }} className="p-4 flex flex-row justify-between items-center border-b border-slate-300">
                                <View className="flex flex-row space-x-2 items-center">
                                    <FontAwesome name="money" size={20} color="#334155" />
                                    <Text className="text-lg font-extrabold">{lang === 'eng' ? 'balance' : 'رصيد'}</Text>
                                </View>
                                <View className="flex flex-row space-x-1 items-center">
                                    <Text className="text-sm font-bold text-gray-500 uppercase">{parseFloat(userData?.balance).toFixed(2) || 'N/A'} {userData?.currency || ''}</Text>
                                    <MaterialIcons name="navigate-next" size={25} color="#334155" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setEdit({ key: "currency", value: userData?.currency })
                                setToggleModal(true)
                            }} className="p-4 flex flex-row justify-between items-center">
                                <View className="flex flex-row space-x-2 items-center">
                                    <MaterialIcons name="currency-exchange" size={20} color="#334155" />
                                    <Text className="text-lg font-extrabold">{lang === 'eng' ? 'currency' : 'عُمْلَة'}</Text>
                                </View>
                                <View className="flex flex-row space-x-1 items-center">
                                    <Text className="text-sm font-bold text-gray-500 uppercase">{userData?.currency || 'N/A'}</Text>
                                    <MaterialIcons name="navigate-next" size={25} color="#334155" />
                                </View>
                            </TouchableOpacity>

                        </View>
                        <Text className="mt-8 text-black font-bold text-md text-gray-900">{lang === 'eng' ? 'Interface' : 'إعدادات الواجهة'}</Text>
                        <View className="mt-2 bg-slate-100 rounded-xl border border-slate-300">
                            <TouchableOpacity onPress={() => {
                                setEdit({ key: "lang", value: userData?.lang })
                                setToggleModal(true)
                            }} className="p-4 flex flex-row justify-between items-center">
                                <View className="flex flex-row space-x-2 items-center">
                                    <Entypo name="language" size={20} color="#334155" />
                                    <Text className="text-lg font-extrabold">{lang === 'eng' ? 'language' : 'لغة'} </Text>
                                </View>
                                <View className="flex flex-row space-x-1 items-center">
                                    <Text className="text-sm font-bold text-gray-500">{userData?.lang === 'eng' ? 'english' : 'العربية' || 'N/A'}</Text>
                                    <MaterialIcons name="navigate-next" size={25} color="#334155" />
                                </View>
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity onPress={() => handlRedirect("mailto:hizmi.abdelhakim@gmail.com")} className="mt-14 bg-slate-100 rounded-xl border border-slate-300 py-3 px-4 flex flex-row space-x-4 items-center">
                            <AntDesign name="like2" size={24} color="#334155" />
                            <View className="">
                                <Text className="text-lg font-extrabold">{lang === 'eng' ? 'Leave feedback' : 'ترك ردود الفعل'}</Text>
                                <Text className="text-md w-[32vh] font-meduim">{lang === 'eng' ? 'Let us know what you think of the app.' : 'أخبرنا برأيك في التطبيق.'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setToggleModalDelete(true)} className="mt-4 bg-slate-100 rounded-xl border border-slate-300 py-3 px-4 flex flex-row space-x-4 items-center">
                            <Octicons name="repo-deleted" size={24} color="red" />
                            <View className="">
                                <Text className="text-lg font-extrabold text-red-600">{lang === 'eng' ? 'Delete account' : 'حذف الحساب'}</Text>
                                <Text className="text-xs w-[32vh] font-meduim text-red-500">
                                    {lang === 'eng' ? `Deleting your account will remove all of your information from our database. This cannot be undone.`
                                        : `حذف حسابك سيقوم بإزالة جميع معلوماتك من قاعدة بياناتنا. لا يمكن التراجع عن هذا الإجراء.`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text className=" mb-10 mt-4 text-center text-xs text-black/60 font-bold">
                        👨🏻‍💻 {lang === 'eng' ? 'The application was developed by ' : 'تم تطوير التطبيق بواسطة '} 
                            <Text onPress={()=>handlRedirect("https://hakimhizmi.netlify.app/")} className="underline font-extrabold text-black/90">Hakimhizmi.</Text>
                        </Text>

                    </View>
                </View>

                {toggleModal && <EditModal toggleModal={toggleModal} setToggleModal={setToggleModal} edit={edit} setIschange={setIschange} />}
                {toggleModalDelete && <DeleteAccount toggleModalDelete={toggleModalDelete} setToggleModalDelete={setToggleModalDelete} navigation={navigation} />}
            </ScrollView>
    )
}
