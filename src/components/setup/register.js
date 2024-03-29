import React, { useContext, useState } from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SwitchSelector from "react-native-switch-selector";
import Svg from '../../../assets/svg/setupac.png'
import { myContext } from '../../../App'
import { insertUser } from '../../../database';


export default function Register() {
  const { lang, redirectToDashboard } = useContext(myContext)
  const [currency, setCurrency] = useState('usd')
  const [username, setUserName] = useState()
  const [balance, setBalance] = useState()
  const [error, setError] = useState(false)

  const save = async () => {
    if (!username || !balance || !username.trim() || !balance.trim()) {
      return setError(lang === 'eng' ? 'All fields are required.' : 'جميع الحقول مطلوبة.');
    }
    if (isNaN(parseFloat(balance)) || !/^\d+(\.\d+)?$/.test(balance.trim())) {
      return setError(lang === 'eng' ? 'Balance must be a number.' : 'يجب أن يكون الرصيد رقمًا.');
    }
    insertUser(username, balance, currency, lang)
      .then(async (insertedId) => {
        redirectToDashboard()
        console.log(`User inserted with ID: ${insertedId}`);
      })
      .catch(error => {
        console.error('Error inserting user:', error);
      });
  }
  return (
    <SafeAreaView className="h-screen flex justify-center relative">
      <View className={`mb-14 px-5 flex gap-4 justify-center ${lang === 'ar' && ' items-center'}`}>
        <Image source={Svg} alt='logo' className="w-16 h-16" />
        <Text className="mt-3 text-4xl text-gray-900 font-semibold" >{lang === 'eng' ? ' Set up your MD account' : 'أنشئ حسابك في MD.'}</Text>
        <View className="bg-red-600 px-5 py-4 rounded-b-3xl rounded-tr-3xl">
          <Text className="text-white text-sm">
            {lang === 'eng' ?
              `Establish your account effortlessly with no charges involved, and experience the convenience of an entirely offline setup on your personal device.`
              : `أنشئ حسابك بسهولة وبدون رسوم، واستمتع براحة الإعداد كليًا دون الحاجة للاتصال بالإنترنت على جهازك الشخصي.`}</Text>
        </View>
      </View>
      <View className="mb-14 flex flex-col gap-6 px-5">
        <View className="px-5 pt-2 border border-gray-300/60 rounded-2xl">
          <Text className="text-sm text-gray-600 ml-1">{lang === 'eng' ? 'Username' : 'اسم المستخدم'}</Text>
          <TextInput onChangeText={(text) => setUserName(text)} className="h-9 text-gray-900 text-sm text-left" placeholder='E.g., JohnDoe123' placeholderTextColor="gray" />
        </View>
        <View className="px-5 pt-2 border border-gray-300/60 rounded-2xl">
          <Text className="text-sm text-gray-600 ml-1">{lang === 'eng' ? 'Balance' : 'رصيد'}</Text>
          <TextInput onChangeText={(text) => setBalance(text)} keyboardType='number-pad' className="h-9 text-gray-900 text-sm text-left" placeholder='E.g., 500.00' placeholderTextColor="gray" />
        </View>
        <View className="px-1">
          <SwitchSelector
            initial={1} textColor="#dc2626" selectedColor="white" buttonColor="#dc2626" borderColor="#d1d5db" valuePadding={2.5} height={50}
            bold hasPadding backgroundColor="#f9fafb" borderRadius={20}
            options={[
              { label: "MAD", value: "mad" },
              { label: "USD", value: "usd" },
              { label: "EURO", value: "euro" }
            ]}
            testID="currency-switch-selector" accessibilityLabel="currency-switch-selector"
            onPress={value => setCurrency(value)}

          />
        </View>
        {error && <Text className="text-sm text-center font-bold text-red-500">{error}</Text>}

      </View>
      <View className="flex px-8 flex-row justify-between items-center absolute bottom-8 w-full">
        <View className="flex flex-row gap-2">
          <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
          <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
          <View className="w-2.5 h-1.5 bg-gray-300 rounded-full"></View>
          <View className="w-2.5 h-1.5 bg-red-600 rounded-full"></View>
        </View>
        <TouchableOpacity onPress={save} className="bg-red-600 px-8 py-2 rounded-3xl">
          <Text className="text-lg font-bold text-white">{lang === 'eng' ? 'Get Started' : 'ابدأ'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

