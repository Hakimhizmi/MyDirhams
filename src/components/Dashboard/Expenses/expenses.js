import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import ExpenceFilter from './components/expenceFilter'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { deleteExpensesOrIncomes, getExpensesOrIncomes } from '../../../../database';
import { format, isValid } from 'date-fns';
import { langContext } from '../../../../App'
import { SimpleLineIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable';
import { MaterialIcons } from '@expo/vector-icons';
import ModalDelete from '../components/modalDelete';

export default function Expenses({ navigation }) {
    const [toggleModalFilter, setToggleModalFilter] = useState(false)
    const [toggleModalDelete, setToggleModalDelete] = useState(false)
    const [expences, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const { lang } = useContext(langContext)
    const [currency, setCurrency] = useState()
    const [filterbyDate, setDate] = useState(null);
    const [filterByCategorie, setSelectedCategorie] = useState(null)
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false)

    async function fetchData(d = null, c = null, p = 1) {
        try {
            setIsLoading(true);
            const { data, currency } = await getExpensesOrIncomes('expenses', d, c, p);
            if (data.length > 0) {
                setExpenses(prevData => [...prevData, ...data]);
            } else {
                setHasMore(false);
            }
            setCurrency(currency)
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    }

    function reset() {
        setExpenses([]); setPage(1); setHasMore(true);
    }

    useFocusEffect(
        useCallback(() => {
            reset()
            setLoading(true);
            fetchData();
        }, [])
    );

    function handleLoadMoreData() {
        if (!isLoading && hasMore) {
            setPage(prevPage => prevPage + 1);
            fetchData(filterbyDate, filterByCategorie, page + 1);
        }
    }
    
    async function applyFilter() {
        setLoadingBtn(true)
        reset()
        await fetchData(filterbyDate, filterByCategorie);
        setToggleModalFilter(false);
        setLoadingBtn(false)
    }

    async function Delete() {
        try {
            setLoadingBtn(true)
            await deleteExpensesOrIncomes('expenses', toggleModalDelete);
            setToggleModalDelete(false)
            reset()
            fetchData()
        } catch (error) {
            console.error('Error deleting item', error);
        } finally {
            setLoadingBtn(false)
        }
    }

    const renderItem = ({ item, index }) => (
        <Swipeable key={index} rightContent={
            (<TouchableHighlight className="ml-2 h-14 bg-red-500 flex justify-center px-10">
                <MaterialIcons name="delete-outline" size={30} color="white" />
            </TouchableHighlight>)
        } onRightActionRelease={() => setToggleModalDelete(item.id)} >
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-3">
                    <View className="bg-black/90 rounded-xl p-3">
                        <Image source={require('../../../../assets/svg/food.png')} alt='deposit' className="w-6 h-6" />
                    </View>
                    <View className="flex flex-col justify-center">
                        <Text className="text-lg font-bold text-gray-900 capitalize">{item?.title || 'xxxx'}</Text>
                        <Text className="text-sm -mt-1 text-gray-700">
                            {isValid(new Date(item.date)) && format(new Date(item.date), 'dd MMM yyyy \'at\' HH:mm')}</Text>
                    </View>
                </View>
                <Text className="text-xl font-bold text-gray-900 uppercase">{item?.amount || 'xxxx'} {currency}</Text>
            </View>
        </Swipeable>
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
            <ScrollView className="h-screen bg-white px-5 py-6" onMomentumScrollEnd={(event) => {
                const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
                const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
                // Adjust the threshold as needed
                if (distanceFromBottom < 50 && !isLoading) {
                  handleLoadMoreData();
                }
              }}>
                <View className="flex flex-row justify-between pt-7">
                    <TouchableOpacity onPress={() => navigation.jumpTo('home')} className="py-2 px-2.5 border border-gray-400 rounded-lg flex items-center justify-center">
                        <Ionicons name="chevron-back" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToggleModalFilter(true)} className="py-2 px-4 border border-gray-400 rounded-lg flex flex-row space-x-1 items-center justify-center">
                        <Text className="text-gray-900 font-bold" >{lang === "eng" ? 'Filtre by' : 'تصفية حسب'}</Text>
                        <Entypo name="chevron-small-down" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View className="pt-8">
                    <Text className="text-black font-extrabold text-2xl">{lang === 'eng' ? 'Recent Expenses' : 'النفقات الأخيرة'}</Text>
                    <Text className="mt-1 text-gray-600 text-lg">{lang === 'eng' ? 'Swipe to the left to delete the expense.' : 'اسحب لليسار لحذف المصروف.'}</Text>
                    <View className="py-8 flex flex-col gap-4 justify-center">
                        {expences.length > 0 ?
                            <FlatList
                                data={expences}
                                renderItem={renderItem}
                                keyExtractor={(_, index) => index.toString()}
                                ListFooterComponent={renderFooter}
                            />
                            :
                            <View className="py-44 flex items-center justify-center">
                                <SimpleLineIcons name="doc" size={60} color="#959da6" />
                                <Text className="mt-2 text-gray-400/80 font-light text-xl">{lang === 'eng' ? 'No expenses are available.' : 'لا توجد نفقات حاليًّا.'}</Text>
                            </View>
                        }
                    </View>
                </View>

                <ExpenceFilter toggleModalFilter={toggleModalFilter} setToggleModalFilter={setToggleModalFilter} filterbyDate={filterbyDate} setDate={setDate}
                    filterByCategorie={filterByCategorie} setSelectedCategorie={setSelectedCategorie} applyFilter={applyFilter} />
                <ModalDelete toggleModalDelete={toggleModalDelete} setToggleModalDelete={setToggleModalDelete} Delete={Delete} />

            </ScrollView>
    )
}
