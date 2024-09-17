import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import {
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  NativeBaseProvider,
  Text,
  VStack,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../hooks/useFirestorage';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { ITransaction } from '../../types';
import convertTime from '../../ultils/convertTime';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th.1',
    'Th.2',
    'Th.3',
    'Th.4',
    'Th.5',
    'Th.6',
    'Th.7',
    'Th.8',
    'Th.9',
    'Th.10',
    'Th.11',
    'Th.12',
  ],
  dayNames: [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

export const CalendarScreen = () => {
  const [date, setDate] = useState(new Date());
  const [transaction, setTransaction] = useState<ITransaction[]>([]);

  const navigation = useNavigation();

  async function getRevenueWithCategory(dateTime) {
    const current = new Date(dateTime);
    current.setUTCHours(0, 0, 0, 0); // Đặt giờ, phút, giây và milliseconds về 0
    // const current = new Date(moment(dateTime).toISOString()).setHours(
    //   0,
    //   0,
    //   0,
    //   0
    // );
    const endOfToday = new Date(dateTime);
    endOfToday.setUTCHours(23, 59, 59, 999); // Đặt giờ, phút, giây và milliseconds về cuối ngày

    // Tạo query để lấy tài liệu từ collection "revenue" với ngày hiện tại
    const revenueQuery = query(
      collection(db, 'transaction'),
      where('date', '>=', current),
      where('date', '<=', endOfToday)
    );

    const revenueCollection = revenueQuery;
    const revenueSnapshot = await getDocs(revenueCollection);

    const revenueList = await Promise.all(
      revenueSnapshot.docs.map(async (revenueDoc) => {
        const revenueData = revenueDoc.data();
        const categoryRef = revenueData.category;

        // Lấy thông tin của category
        let categoryData: any = {};
        if (categoryRef) {
          const categoryDoc = await getDoc(doc(db, categoryRef.path));
          categoryData = categoryDoc?.data();
        }

        return { ...revenueData, category: categoryData };
      })
    );
    setTransaction(revenueList);
  }

  console.log('rtr--', transaction);

  useEffect(() => {
    getRevenueWithCategory(date);
  }, []);

  const totalsRevenue = useMemo(() => {
    return transaction
      .filter((item) => item?.isRevenue)
      .reduce((acc, cur) => {
        return acc + cur?.amount;
      }, 0);
  }, [transaction]);

  const totalsSpending = useMemo(() => {
    return transaction
      .filter((item) => !item?.isRevenue)
      .reduce((acc, cur) => {
        return acc + cur?.amount;
      }, 0);
  }, [transaction]);

  const totals = useMemo(() => {
    return (totalsSpending || 0) - (totalsRevenue || 0);
  }, [totalsSpending, totalsRevenue]);

  return (
    <NativeBaseProvider>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          backgroundColor: '#F6F9FF',
        }}
        style={{
          marginBottom: 50,
        }}
      >
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Text flex={1} fontSize="2xl" bold>
            Lịch
          </Text>
          <IconButton
            onPress={() => {
              console.log(123123123123);
              navigation.navigate('SearchRoute');
            }}
            icon={<Icon as={MaterialIcons} name="search" />}
            borderRadius="full"
          />
        </HStack>
        <Calendar
          current={date.toISOString().split('T')[0]}
          onDayPress={(day) => {
            setDate(new Date(day.dateString));
            getRevenueWithCategory(new Date(day.dateString));
          }}
          markedDates={{
            [date.toISOString().split('T')[0]]: { selected: true },
          }}
          theme={{
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            arrowColor: 'orange',
            calendarBackground: '#F6F9FF',
          }}
        />
        <Divider my={4} />
        <HStack justifyContent="space-between">
          <VStack alignItems="center">
            <Text>Thu nhập</Text>
            <Text color="blue.500" fontSize="md" bold>
              {totalsSpending}đ
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text>Chi tiêu</Text>
            <Text color="red.500" fontSize="md" bold>
              {totalsRevenue}đ
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text>Tổng</Text>
            <Text
              color={totals > 0 ? 'blue.500' : 'red.500'}
              fontSize="md"
              bold
            >
              {totals}đ
            </Text>
          </VStack>
        </HStack>
        <Divider my={4} />
        {transaction.map((item, index) => (
          <Box key={index} mb={4}>
            <HStack
              mb={2}
              p={2}
              backgroundColor="#DBE6FD"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">{item.title}</Text>

              <Text fontWeight="bold">{convertTime(item?.date)}</Text>
            </HStack>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              bg="#F6F9FF"
            >
              <HStack alignItems="center">
                <Image
                  source={{ uri: item?.category?.image }}
                  style={{ width: 24, height: 24, paddingBottom: 8 }}
                />
                <Text mx={2} fontWeight="bold">
                  {item?.category?.title}
                </Text>
              </HStack>
              <Text
                fontWeight="bold"
                color={item?.isRevenue ? 'red.500' : 'blue.500'}
              >
                {item?.amount}đ
              </Text>
            </HStack>
          </Box>
        ))}
      </ScrollView>
    </NativeBaseProvider>
  );
};
