import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment/moment';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../hooks/useFirestorage';
import { ITransaction } from '../../types';
import { TabView } from 'react-native-tab-view';
import { ExpensesRoute } from './Expense';
import { IncomeRoute } from './Income';
import { renderTabBar, width } from './index';

export const Monthly = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [transaction, setTransaction] = useState<ITransaction[]>([]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'expenses', title: 'Chi tiêu' },
    { key: 'income', title: 'Thu nhập' },
  ]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'expenses':
        return <ExpensesRoute data={listRevenue} />;
      case 'income':
        return <IncomeRoute data={listSpending} />;
    }
  };
  const handlePrevMonth = () => {
    const prevMonth = currentDate.clone().subtract(1, 'month');
    setCurrentDate(prevMonth);
    getRevenueForMonth(prevMonth.get('year'), prevMonth.get('month'));
  };
  const handleNextMonth = () => {
    const nextMonth = currentDate.clone().add(1, 'month');
    setCurrentDate(nextMonth);
    getRevenueForMonth(nextMonth.get('year'), nextMonth.get('month'));
  };

  async function getRevenueForMonth(year, month) {
    try {
      // Tạo thời gian đầu tháng và cuối tháng
      const startOfMonth = new Date(year, month, 1); // Tháng trong JavaScript bắt đầu từ 0
      const endOfMonth = new Date(year, month + 1, 0); // Ngày 0 của tháng tiếp theo là ngày cuối cùng của tháng hiện tại

      // Tạo query để lấy tài liệu từ collection "revenue" trong khoảng thời gian từ đầu tháng đến cuối tháng
      const revenueQuery = query(
        collection(db, 'transaction'),
        where('date', '>=', startOfMonth),
        where('date', '<=', endOfMonth)
      );
      const revenueSnapshot = await getDocs(revenueQuery);

      const revenueList = await Promise.all(
        revenueSnapshot.docs.map(async (revenueDoc) => {
          const revenueData = revenueDoc.data();
          const categoryRef = revenueData.category;
          // Lấy thông tin của category
          let categoryData = {};
          if (categoryRef) {
            const categoryDoc = await getDoc(doc(db, categoryRef.path));
            if (categoryDoc?.exists()) {
              categoryData = categoryDoc?.data();
            } else {
              console.log('No such document!', revenueData);
            }
          }

          return { ...revenueData, category: categoryData };
        })
      );
      setTransaction(revenueList);
    } catch (e) {
      console.error('Error getting documents: ', e);
    }
  }

  const listRevenue = useMemo(() => {
    return transaction.filter((item) => item.isRevenue);
  }, [transaction]);

  const listSpending = useMemo(() => {
    return transaction.filter((item) => !item.isRevenue);
  }, [transaction]);

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

  useEffect(() => {
    getRevenueForMonth(currentDate.get('year'), currentDate.get('month'));
  }, []);

  return (
    <Box flex={1}>
      <HStack justifyContent="space-between" alignItems="center" mb={4}>
        <Pressable onPress={handlePrevMonth}>
          <Icon as={MaterialIcons} name="chevron-left" size="lg" />
        </Pressable>
        <Text fontSize="2xl" bold>
          {currentDate.format('MM/YYYY')}
        </Text>
        <Pressable onPress={handleNextMonth}>
          <Icon as={MaterialIcons} name="chevron-right" size="lg" />
        </Pressable>
      </HStack>
      <Divider my={4} />
      <VStack space={2}>
        <HStack justifyContent="space-between">
          <Text>Chi:</Text>
          <Text fontSize="xl" color="red.500" bold>
            {totalsRevenue}đ
          </Text>
        </HStack>
        <Divider my={4} />
        <HStack justifyContent="space-between">
          <Text>Thu:</Text>
          <Text fontSize="xl" color="blue.500" bold>
            {totalsSpending}đ
          </Text>
        </HStack>

        <Divider my={4} />
        <HStack justifyContent="space-between">
          <Text>Thu chi:</Text>
          <Text fontSize="xl" color={totals > 0 ? 'blue.500' : 'red.500'} bold>
            {totals}đ
          </Text>
        </HStack>
      </VStack>

      <Divider my={4} />
      <Box style={{ height: 500 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width }}
        />
      </Box>
    </Box>
  );
};
