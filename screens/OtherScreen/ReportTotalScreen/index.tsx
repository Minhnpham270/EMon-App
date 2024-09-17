import React, { useEffect, useMemo, useState } from 'react';
import { Box, ScrollView, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { ExpensesRoute } from '../../ReportScreen/Expense';
import { IncomeRoute } from '../../ReportScreen/Income';
import { ITransaction } from '../../../types';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../../hooks/useFirestorage';

const { width } = Dimensions.get('window');

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#007bff' }}
    style={{ backgroundColor: 'white' }}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color: focused ? '#007bff' : '#222', margin: 8 }}>
        {route.title}
      </Text>
    )}
  />
);

const ReportTotalScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [transaction, setTransaction] = useState<ITransaction[]>([]);

  const [routes] = React.useState([
    { key: 'expenses', title: 'Chi tiêu' },
    { key: 'income', title: 'Thu nhập' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'expenses':
        return <ExpensesRoute data={listRevenue} showTotal />;
      case 'income':
        return <IncomeRoute data={listSpending} showTotal />;
    }
  };

  async function getTransaction() {
    try {
      // Tạo thời gian đầu tháng và cuối tháng

      // Tạo query để lấy tài liệu từ collection "revenue" trong khoảng thời gian từ đầu tháng đến cuối tháng
      const revenueQuery = query(collection(db, 'transaction'));
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

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <ScrollView bg="white" contentContainerStyle={{ flexGrow: 1 }}>
      <Box p={2} flex={1}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width }}
        />
      </Box>
    </ScrollView>
  );
};

export default ReportTotalScreen;
