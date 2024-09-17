import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Center,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../../hooks/useFirestorage';
import { ITransaction } from '../../../types';

const DetailReportCategoryScreen = () => {
  const [transaction, setTransaction] = useState<ITransaction[]>([]);

  async function getTransaction() {
    try {
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

  useEffect(() => {
    getTransaction();
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
    <ScrollView bg="white">
      <Box mt={8} w="100%" maxW="100%" mx="auto">
        <Center>
          <VStack w="100%">
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Thu nhập</Text>
              <Text bold>{totalsSpending}đ</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Chi tiêu</Text>
              <Text bold>{totalsRevenue}đ</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Tổng</Text>
              <Text bold>{totals}đ</Text>
            </HStack>
          </VStack>
          <VStack mt={4} w="100%">
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Số dư ban đầu</Text>
              <Text bold>0đ</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Tổng</Text>
              <Text bold>{totals}đ</Text>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </ScrollView>
  );
};

export default DetailReportCategoryScreen;
