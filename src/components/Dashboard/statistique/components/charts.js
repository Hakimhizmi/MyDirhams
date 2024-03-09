import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { getStatistiqueData } from '../../../../../database';
import { langContext } from '../../../../../App'
import { AntDesign } from '@expo/vector-icons';

const formatYLabel = (value) => {
  if (value >= 1000) {
    const formattedValue = (value / 1000).toFixed(1);
    return `${formattedValue}k`;
  } else {
    return `${value}`;
  }
};

const colors = [
  '#FF5733',
  '#33FF57',
  '#5733FF',
  '#33A3FF',
  '#FF33A3',
  '#A333FF',
  '#33FFD2',
  '#D233FF',
  '#33FFA3',
  '#FF8C33',
  '#338CFF',
  '#FFD233',
];

export default function Charts({table}) {
  const { lang } = useContext(langContext)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [selectedYear, setselectedYear] = useState(currentYear)
  const [dataTotalAmountPerMonth, setDataTotalAmountPerMonth] = useState([])
  const [dataCategoryPercentages, setDataCategoryPercentages] = useState([])
  const [totalExpensesPerYear, setTotalExpensesPerYear] = useState(0)
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      getStatistiqueData(table, selectedYear)
        .then((data) => {
          const { monthsArray, totalExpenses, currency, categoriesPercentage } = data
          setDataTotalAmountPerMonth(monthsArray);
          setDataCategoryPercentages(categoriesPercentage)
          setTotalExpensesPerYear(totalExpenses);
          setCurrency(currency);
        })
        .catch((error) => console.error('Error fetching:', error))
        .finally(() => setLoading(false))
    }, [selectedYear])
  );

  return (
    loading ?
      <View className="h-screen bg-white flex items-center justify-center">
        <Image source={require('../../../../../assets/gif/loader.gif')} className="w-64" />
      </View>
      :
      <ScrollView className="h-screen bg-white" >
        <View className="mt-4 flex flex-col space-y-2 items-center">
          <View className="flex flex-row items-center space-x-2">
            <Text className="text-xl font-bold uppercase">{lang === 'eng' ? `Total ${table === 'expenses' ? 'expenses' : 'incomes'}` : `إجمالي ${table === 'expenses' ? 'النفقات' : 'الإيرادات'}`}</Text>
            <Text className="text-xs font-bold mt-1">{selectedYear}</Text>
          </View>
          <Text className="text-4xl font-meduim uppercase">{parseFloat(totalExpensesPerYear).toFixed(2)} {currency}</Text>
        </View>
        <View className="flex items-center mt-8">
          <BarChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [{ data: dataTotalAmountPerMonth }]
            }}
            width={Dimensions.get("window").width}
            height={300}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: "white",
              backgroundGradientTo: "whie",
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.5,
              formatYLabel: (value) => `${formatYLabel(value)}`
            }}
          />
          <View className="flex mt-2 flex-row flex-row-reverse">
            {Array.from({ length: 5 }, (_, index) => (
              <TouchableOpacity onPress={() => setselectedYear(currentYear - index)} className={`px-4 py-2 ${(currentYear - index) === selectedYear && 'bg-red-100 rounded-2xl'}`}>
                <Text className={`font-bold text-gray-700 ${(currentYear - index) === selectedYear ? 'text-red-500' : 'text-gray-700'}`}>{currentYear - index}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {dataCategoryPercentages && dataCategoryPercentages.length > 0 ?
            <PieChart
              data={dataCategoryPercentages.map((item, index) => ({
                name: item.category,
                percentage: item.percentage,
                color: colors[index],
                legendFontColor: 'black',
                legendFontSize: 10,
              }))}
              width={Dimensions.get("window").width}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,

              }}
              accessor="percentage"
              backgroundColor="transparent"
              style={{ marginTop: 22 }}
            /> :
            <View className="py-10 flex items-center justify-center">
              <AntDesign name="piechart" size={60} color="#d1d5db" />
              <Text className="mt-4 text-gray-400/80 font-light text-lg text-center uppercase">
                {lang === 'eng' ? 'No statistical data is available.' : 'لا توجد إحصائيات متاحة.'}</Text>
            </View>
          }
        </View>
      </ScrollView>
  )
}
