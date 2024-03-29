import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import deposit from '../../../../assets/svg/deposit.png'
import withdraw from '../../../../assets/svg/withdraw.png'
import Deposit from './components/deposit'
import Withdraw from './components/withdraw'
import { getTodayData, getUserData } from '../../../../database'
import { myContext } from '../../../../App'
import { useFocusEffect } from '@react-navigation/native'
import { format, isValid } from 'date-fns'
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { getCategoryIcon } from '../../../utils/iconmapping'


export default function Home() {
  const [toggleModalDeposit, setToggleModalDeposit] = useState(false)
  const [toggleModalWithdraw, setToggleModalWithdraw] = useState(false)
  const [userData, setUserData] = useState({})
  const [todayExpensesIncomes, setTodayData] = useState([])
  const [loading, setLoading] = useState(true)
  const { lang } = useContext(myContext)
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ischange, setIschange] = useState();

  async function fetchTodayData(p = 1) {
    try {
      setIsLoading(true);
      const data = await getTodayData(p);
      if (data.length > 0) {
        setTodayData(prevData => [...prevData, ...data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }

  function reset() {
    setLoading(true)
    setTodayData([]); setPage(1); setHasMore(true);
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          reset()
          const userData = await getUserData();
          setUserData(userData);
          await fetchTodayData()
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      fetchData();
    }, [ischange])
  );

  const handleLoadMoreData = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
      fetchTodayData(page + 1);
    }
  }

  const renderItem = ({ item, index }) => (
    <View key={index} className="flex mt-3 flex-row justify-between items-center">
      <View className="flex flex-row gap-3">
        <View className="bg-black/90 rounded-xl p-3">
          <Ionicons name={getCategoryIcon(item.type === 'expense' ? item.category : item.title)} size={25} color="white" />
        </View>
        <View className="flex flex-col justify-center">
          <Text className="text-lg font-bold text-gray-900 max-w-[24vh]" numberOfLines={1} ellipsizeMode="tail">{item?.title || 'xxxx'}</Text>
          <Text className="text-sm -mt-1 text-gray-700">
            {isValid(new Date(item.date)) && format(new Date(item.date), `'${lang === 'eng' ? 'Today at' : 'اليوم في'}' HH:mm`)}</Text>
        </View>
      </View>
      <Text className={`text-xl font-bold ${item.type === 'expense' ? 'text-red-500' : ' text-green-500'}`}>
        {item.type === 'expense' ? '-' : '+'}{item?.amount || 'xxxx'} <Text className="uppercase">{userData?.currency || ''}</Text></Text>
    </View>
  );

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View className="flex items-center justify-center py-2">
          <ActivityIndicator size="small" color="#999" />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
 loading ?
        <View className="h-screen bg-white flex items-center justify-center">
          <Image source={require('../../../../assets/gif/loader.gif')} className="w-64" />
        </View>
        :
        <ScrollView className="h-screen" showsVerticalScrollIndicator={false} onMomentumScrollEnd={(event) => {
          const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
          const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
          // Adjust the threshold as needed
          if (distanceFromBottom < 50 && !isLoading) {
            handleLoadMoreData();
          }
        }} >
          <ImageBackground source={require('../../../../assets/images/gradienta.jpg')} className="bg-red-100 object-cover">
            <View className="px-4 pt-14 flex flex-row justify-between">
              <Text className="w-full text-meduim text-lg text-gray-900 capitalize">{lang === 'eng' ? 'Hello' : 'مرحبًا'}, <Text className="font-bold text-xl italic text-black">{userData?.username || 'unknown'}</Text></Text>
            </View>
            <View className="py-16 flex flex-col gap-3 items-center justify-center">
              <Text className="text-xl font-bold text-gray-800">{lang === 'eng' ? 'Availiable balance' : 'الرصيد المتاح'}</Text>
              <Text className="text-6xl font-black text-black text-center">{userData?.balance ? parseFloat(userData.balance).toFixed(2) : "N/A"} <Text className="uppercase">{userData?.currency || ''}</Text></Text>
            </View>

            <View className="bg-white rounded-[70px] h-full px-7 pt-7">
              <Text className="text-2xl font-bold text-gray-900">{lang === 'eng' ? 'Services' : 'خدمات'} </Text>
              <View className="px-2 py-4 flex flex-row gap-6">
                <TouchableOpacity className="flex flex-col gap-1 items-center" onPress={() => setToggleModalDeposit(true)}>
                  <View className="bg-purple-100 p-4 rounded-full">
                    <Image source={deposit} alt='deposit' className="w-8 h-8" />
                  </View>
                  <Text className="text-lg font-semibold text-gray-900">{lang === 'eng' ? 'Deposit' : 'إيداع'}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-col gap-1 items-center" onPress={() => setToggleModalWithdraw(true)}>
                  <View className="bg-blue-100 p-4 rounded-full">
                    <Image source={withdraw} alt='deposit' className="w-8 h-8" />
                  </View>
                  <Text className="text-lg font-semibold text-gray-900">{lang === 'eng' ? 'Withdraw' : 'سحب'} </Text>
                </TouchableOpacity>

              </View>
              <Text className="text-2xl font-bold text-gray-900">{lang === 'eng' ? 'Today' : 'اليوم'}</Text>

              <View className="pb-4 pt-1 flex flex-col min-h-[31vh]">
                {todayExpensesIncomes.length > 0 ?
                  <FlatList
                    data={todayExpensesIncomes}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    ListFooterComponent={renderFooter}
                  />
                  :
                  <View className="py-[8vh] flex items-center justify-center">
                    <SimpleLineIcons name="doc" size={40} color="#d1d5db" />
                    <Text className="mt-2 text-gray-400/80 font-light text-xl text-center">{lang === 'eng' ? 'There have been no transactions today.' : 'لم تحدث أي معاملات اليوم.'}</Text>
                  </View>
                }
              </View>
            </View>
          </ImageBackground>

          {toggleModalDeposit && <Deposit toggleModalDeposit={toggleModalDeposit} setToggleModalDeposit={setToggleModalDeposit} setIschange={setIschange} />}
          {toggleModalWithdraw && <Withdraw toggleModalWithdraw={toggleModalWithdraw} setToggleModalWithdraw={setToggleModalWithdraw} setIschange={setIschange} />}

        </ScrollView>
  )
}
