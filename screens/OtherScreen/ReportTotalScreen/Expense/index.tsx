import { Image, View } from 'react-native';
import { Box, Divider, HStack, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ITransaction } from '../../../../types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../../hooks/useFirestorage';

export const ExpensesCategory = () => {
  const [transaction, setTransaction] = useState<ITransaction[]>([]);

  async function getRevenue() {
    try {
      // Tạo query để lấy tài liệu từ collection "revenue" trong khoảng thời gian từ đầu tháng đến cuối tháng
      const revenueQuery = query(
        collection(db, 'transaction'),
        where('isRevenue', '==', true)
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

  useEffect(() => {
    getRevenue();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {transaction.map((item, index) => (
        <Box key={index}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
              <Image
                source={{ uri: item?.category?.image }}
                style={{ width: 24, height: 24, paddingBottom: 8 }}
              />
              <Text bold mx={2}>
                {item.category.title}
              </Text>
            </HStack>
            <Text bold color={'red.500'}>
              {item.amount}đ
            </Text>
          </HStack>
          <Divider my={2} />
        </Box>
      ))}
    </View>
  );
};
