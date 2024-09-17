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
import { TabView } from 'react-native-tab-view';
import { renderTabBar, width } from './index';
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
import { ExpensesRoute } from './Expense';
import { IncomeRoute } from './Income';

export const Yearly = ({
  reportCategoryScreen,
}: {
  reportCategoryScreen?: boolean;
}) => {
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
        return (
          <ExpensesRoute data={listRevenue} showTotal={reportCategoryScreen} />
        );
      case 'income':
        return (
          <IncomeRoute data={listSpending} showTotal={reportCategoryScreen} />
        );
    }
  };
  const handlePrevMonth = () => {
    const prevYear = currentDate.clone().subtract(1, 'year');
    setCurrentDate(prevYear);
    getRevenueForYear(prevYear.get('year'));
  };
  const handleNextMonth = () => {
    const nextYear = currentDate.clone().add(1, 'year');
    setCurrentDate(nextYear);
    getRevenueForYear(nextYear);
  };

  async function getRevenueForYear(year) {
    try {
      // Tạo thời gian đầu tháng và cuối tháng
      const startOfYear = new Date(year, 0, 1); // Tháng trong JavaScript bắt đầu từ 0
      const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999); // Ngày 0 của tháng tiếp theo là ngày cuối cùng của tháng hiện tại

      console.log('startOfYear---', startOfYear);
      console.log('endOfYear---', endOfYear);

      // Tạo query để lấy tài liệu từ collection "revenue" trong khoảng thời gian từ đầu tháng đến cuối tháng
      const revenueQuery = query(
        collection(db, 'transaction'),
        where('date', '>=', startOfYear),
        where('date', '<=', endOfYear)
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

  console.log('Yearly in Report---------', transaction);

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
    getRevenueForYear(currentDate.get('year'));
  }, []);

  if (reportCategoryScreen) {
    return (
      <Box style={{ flex: 1 }}>
        <HStack justifyContent="space-between" alignItems="center" my={4}>
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
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width }}
        />
      </Box>
    );
  }

  return (
    <Box>
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
