import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import moment from 'moment/moment';
import { MaterialIcons } from '@expo/vector-icons';
import { ReportItem } from './ReportItem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../hooks/useFirestorage';

enum ReportScreen {
  INCOME = 'Thu nhập',
  EXPENSES = 'Chi tiêu',
  TOTAL = 'Tổng',
}

const ReportYearScreen = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [screen, setScreen] = useState<ReportScreen>(ReportScreen.EXPENSES);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSetScreen = (value: ReportScreen) => {
    setScreen(value);
  };
  const handlePrevMonth = () => {
    const yearPrev = currentDate.clone().subtract(1, 'year');
    setCurrentDate(yearPrev);
    getMonthlyTransactionForYear(yearPrev.get('year'));
  };

  const handleNextMonth = () => {
    const yearNext = currentDate.clone().add(1, 'year');
    setCurrentDate(yearNext);
    getMonthlyTransactionForYear(yearNext.get('year'));
  };

  async function getMonthlyTransactionForYear(year) {
    try {
      setLoading(true);
      const monthlyRevenue = Array(12).fill(0); // Mảng để lưu tổng số tiền cho 12 tháng

      for (let month = 0; month < 12; month++) {
        // Tạo thời gian đầu tháng và cuối tháng
        const startOfMonth = new Date(year, month, 1); // Tháng trong JavaScript bắt đầu từ 0
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999); // Ngày 0 của tháng tiếp theo là ngày cuối cùng của tháng hiện tại
        // Tạo query để lấy tài liệu từ collection "revenue" trong khoảng thời gian từ đầu tháng đến cuối tháng
        const revenueQueryScreenIncome = query(
          collection(db, 'transaction'),
          where('isRevenue', '==', true),
          where('date', '>=', startOfMonth),
          where('date', '<=', endOfMonth)
        );
        const revenueQueryScreenExpense = query(
          collection(db, 'transaction'),
          where('isRevenue', '==', false),
          where('date', '>=', startOfMonth),
          where('date', '<=', endOfMonth)
        );

        const revenueQueryScreenTotal = query(
          collection(db, 'transaction'),
          where('date', '>=', startOfMonth),
          where('date', '<=', endOfMonth)
        );

        const returnQuery = () => {
          switch (screen) {
            case ReportScreen.INCOME:
              return revenueQueryScreenIncome;
            case ReportScreen.EXPENSES:
              return revenueQueryScreenExpense;
            case ReportScreen.TOTAL:
              return revenueQueryScreenTotal;
          }
        };

        const revenueSnapshot = await getDocs(returnQuery());

        // Tính tổng số tiền cho tháng hiện tại
        let totalAmountForMonth = 0;
        revenueSnapshot.docs.forEach((doc) => {
          totalAmountForMonth += doc.data().amount;
        });

        // Lưu tổng số tiền vào mảng
        monthlyRevenue[month] = {
          id: `T${month + 1}`,
          amount: totalAmountForMonth,
        };
      }

      setDataList(monthlyRevenue);
      setLoading(false);
    } catch (e) {
      console.error('Error getting documents: ', e);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMonthlyTransactionForYear(currentDate.get('year'));
  }, [screen]);

  return (
    <ScrollView bg="white">
      <Box p={2} px={4} w="100%" maxW="100%" mx="auto" bgColor="#F6F9FF">
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Pressable onPress={handlePrevMonth}>
            <Icon as={MaterialIcons} name="chevron-left" size="lg" />
          </Pressable>
          <Text fontSize="2xl" bold>
            {currentDate.format('YYYY')}
          </Text>
          <Pressable onPress={handleNextMonth}>
            <Icon as={MaterialIcons} name="chevron-right" size="lg" />
          </Pressable>
        </HStack>

        <Center mb={4}>
          <HStack alignItems="center">
            <Pressable
              borderRadius={screen === ReportScreen.EXPENSES ? 8 : 0}
              bgColor={screen === ReportScreen.EXPENSES ? '#C0D3FC' : '#F6F9FF'}
              p={2}
              px={4}
              onPress={() => handleSetScreen(ReportScreen.EXPENSES)}
            >
              <Text>Chi Tiêu</Text>
            </Pressable>
            <Pressable
              borderRadius={screen === ReportScreen.INCOME ? 8 : 0}
              bgColor={screen === ReportScreen.INCOME ? '#C0D3FC' : '#F6F9FF'}
              p={2}
              px={4}
              onPress={() => handleSetScreen(ReportScreen.INCOME)}
            >
              <Text>Thu nhập</Text>
            </Pressable>
            <Pressable
              borderRadius={screen === ReportScreen.TOTAL ? 8 : 0}
              bgColor={screen === ReportScreen.TOTAL ? '#C0D3FC' : '#F6F9FF'}
              p={2}
              px={4}
              onPress={() => handleSetScreen(ReportScreen.TOTAL)}
            >
              <Text>Tổng</Text>
            </Pressable>
          </HStack>
        </Center>

        {loading ? (
          <Center>
            <Text>Loading...</Text>
          </Center>
        ) : (
          <ReportItem data={dataList} />
        )}
      </Box>
    </ScrollView>
  );
};

export default ReportYearScreen;
