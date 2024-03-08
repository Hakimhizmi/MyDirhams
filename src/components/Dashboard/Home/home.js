import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import deposit from '../../../../assets/svg/deposit.png'
import withdraw from '../../../../assets/svg/withdraw.png'
import savemoney from '../../../../assets/svg/savemoney.png'
import Deposit from './components/deposit'
import Withdraw from './components/withdraw'
import { getTodayData, getUserData } from '../../../../database'
import { langContext } from '../../../../App'
import { useFocusEffect } from '@react-navigation/native'
import { format, isValid } from 'date-fns'
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Home() {
  const [toggleModalDeposit, setToggleModalDeposit] = useState(false)
  const [toggleModalWithdraw, setToggleModalWithdraw] = useState(false)
  const [userData, setUserData] = useState({})
  const [todayExpensesIncomes, setTodayData] = useState([])
  const [loading, setLoading] = useState(true)
  const { lang } = useContext(langContext)
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

  function handleLoadMoreData() {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
      fetchTodayData(page + 1);
    }
  }

  const renderItem = ({ item, index }) => (
    <View key={index} className="flex mt-3 flex-row justify-between items-center">
      <View className="flex flex-row gap-3">
        <View className="bg-black/90 rounded-xl p-3">
          <Image source={require('../../../../assets/svg/food.png')} alt='deposit' className="w-6 h-6" />
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
      <ScrollView className="h-screen">
        <ImageBackground source={require('../../../../assets/images/gradienta.jpg')} className="bg-red-100 object-cover">
          <View className="px-4 pt-10 flex flex-row justify-between">
            <Text className="text-meduim text-lg text-gray-900 capitalize">{lang === 'eng' ? 'Hello' : 'مرحبًا'}, <Text className="font-bold text-xl italic text-black">{userData?.username || 'unknown'}</Text></Text>
          </View>
          <View className="py-16 flex flex-col gap-3 items-center justify-center">
            <Text className="text-xl font-bold text-gray-800">{lang === 'eng' ? 'Availiable balance' : 'الرصيد المتاح'}</Text>
            <Text className="text-6xl font-black text-black text-center">{userData?.balance || '........'} <Text className="uppercase">{userData?.currency || ''}</Text></Text>
          </View>

          <View className="bg-white rounded-[70px] h-full px-7 pt-7">
            <Text className="text-2xl font-bold text-gray-900">{lang === 'eng' ? 'Services' : 'خدمات'} </Text>
            <View className="px-4 py-6 flex flex-row gap-12">
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
              <TouchableOpacity className="flex flex-col gap-1 items-center">
                <View className="bg-orange-100 p-4 rounded-full">
                  <Image source={savemoney} alt='deposit' className="w-8 h-8" />
                </View>
                <Text className="text-lg font-semibold text-gray-900">{lang === 'eng' ? 'Save Money' : 'توفير الأموال'}</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold text-gray-900">{lang === 'eng' ? 'Today' : 'اليوم'}</Text>

            <View className="pb-4 pt-1 flex flex-col min-h-[34vh]">
              {todayExpensesIncomes.length > 0 ?
                <FlatList
                  data={todayExpensesIncomes}
                  renderItem={renderItem}
                  keyExtractor={(_, index) => index.toString()}
                  onEndReached={handleLoadMoreData}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={renderFooter}
                />
                :
                <View className="py-16 flex items-center justify-center">
                  <SimpleLineIcons name="doc" size={60} color="#959da6" />
                  <Text className="mt-2 text-gray-400/80 font-light text-xl">{lang === 'eng' ? 'There have been no transactions today.' : 'لم تحدث أي معاملات اليوم.'}</Text>
                </View>
              }
            </View>
          </View>
        </ImageBackground>

        <Deposit toggleModalDeposit={toggleModalDeposit} setToggleModalDeposit={setToggleModalDeposit} setIschange={setIschange}/>
        <Withdraw toggleModalWithdraw={toggleModalWithdraw} setToggleModalWithdraw={setToggleModalWithdraw} setIschange={setIschange}/>

      </ScrollView>
  )
}
