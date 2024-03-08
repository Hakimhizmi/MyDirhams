import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native'
import IncomeFilter from './components/incomeFilter'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { langContext } from '../../../../App'
import { useFocusEffect } from '@react-navigation/native';
import { deleteExpensesOrIncomes, getExpensesOrIncomes } from '../../../../database';
import { format, isValid } from 'date-fns';
import { SimpleLineIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable';
import { MaterialIcons } from '@expo/vector-icons';
import ModalDelete from '../components/modalDelete';



export default function Incomes({ navigation }) {
    const [toggleModalFilter, setToggleModalFilter] = useState(false)
    const [toggleModalDelete, setToggleModalDelete] = useState(false)
    const [incomes, setIncomes] = useState([])
    const [currency, setCurrency] = useState()
    const [loading, setLoading] = useState(true)
    const { lang } = useContext(langContext)
    const [filterbyDate, setDate] = useState(null);
    const [filterByCategorie, setSelectedCategorie] = useState(null)
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false)

    async function fetchData(d = null, c = null, p = 1) {
        try {
            setIsLoading(true);
            const { data, currency } = await getExpensesOrIncomes('income', d, c, p);
            if (data.length) {
                setIncomes(prevData => [...prevData, ...data]);
            } else {
                setHasMore(false);
            }
            setCurrency(currency);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    }

    function handleLoadMoreData() {
        if (!isLoading && hasMore) {
            setPage(prevPage => prevPage + 1);
            fetchData(filterbyDate, filterByCategorie, page + 1);
        }
    }

    function reset() {
        setIncomes([]); setPage(1); setHasMore(true);
    }

    useFocusEffect(
        useCallback(() => {
            reset()
            setLoading(true);
            fetchData();
        }, [])
    );

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
            await deleteExpensesOrIncomes('income', toggleModalDelete);
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
        <Swipeable
            key={index}
            rightContent={
                <TouchableHighlight
                    style={{ marginLeft: 2, height: 56, backgroundColor: '#ff6347', justifyContent: 'center', paddingHorizontal: 10 }}
                    onPress={() => setToggleModalDelete(item.id)}
                >
                    <MaterialIcons name="delete-outline" size={30} color="white" />
                </TouchableHighlight>
            }
            onRightActionRelease={() => setToggleModalDelete(item.id)}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{item?.source || 'xxxx'}</Text>
                    <Text style={{ fontSize: 12, marginTop: -1, color: '#555' }}>
                        {isValid(new Date(item.date)) && format(new Date(item.date), "dd MMM yyyy 'at' HH:mm")}
                    </Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', textTransform: 'uppercase' }}>
                    {item?.amount || 'xxxx'} {currency}
                </Text>
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
            <ScrollView className="h-screen bg-white px-5 py-6">
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
                    <Text className="text-black font-extrabold text-2xl">{lang === 'eng' ? 'lastest Incomes' : 'أحدث الإيرادات'}</Text>
                    <Text className="mt-1 text-gray-600 text-lg">{lang === 'eng' ? 'Swipe to the left to delete the expense.' : 'اسحب لليسار لحذف المصروف.'}</Text>
                    <View className="py-8 flex flex-col gap-4 justify-center">
                        {incomes.length > 0 ?
                            <FlatList
                                data={incomes}
                                renderItem={renderItem}
                                keyExtractor={(_, index) => index.toString()}
                                onEndReached={handleLoadMoreData}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={renderFooter}
                            /> :
                            <View className="py-44 flex items-center justify-center">
                                <SimpleLineIcons name="doc" size={60} color="#959da6" />
                                <Text className="mt-2 text-gray-400/80 font-light text-xl">{lang === 'eng' ? 'No income are available.' : 'لا توجد أية إيرادات متاحة.'}</Text>
                            </View>}
                    </View>
                </View>

                <IncomeFilter toggleModalFilter={toggleModalFilter} setToggleModalFilter={setToggleModalFilter} filterbyDate={filterbyDate} setDate={setDate}
                    filterByCategorie={filterByCategorie} setSelectedCategorie={setSelectedCategorie} applyFilter={applyFilter} loadingBtn={loadingBtn} />

                <ModalDelete toggleModalDelete={toggleModalDelete} setToggleModalDelete={setToggleModalDelete} Delete={Delete} loadingBtn={loadingBtn} />
            </ScrollView>
    )
}
