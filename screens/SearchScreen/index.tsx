import { Box, HStack, Icon, Input, ScrollView, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { ITransaction } from '../../types';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../hooks/useFirestorage';
import { Image } from 'react-native';
import convertDate from '../../ultils/convertDate';

export const SearchScreen = () => {
  const [value, setValue] = React.useState('');
  const [transaction, setTransaction] = React.useState<ITransaction[]>([]);
  const initListTransaction = useRef<ITransaction[]>([]);
  const debounceValue = useDebounce(value, 300);

  async function getTransaction() {
    try {
      // Tạo thời gian đầu tháng và cuối tháng

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
      initListTransaction.current = revenueList as any;
    } catch (e) {
      console.error('Error getting documents: ', e);
    }
  }

  useEffect(() => {
    getTransaction();
  }, []);

  console.log('initListTransaction.current---', initListTransaction.current);

  useEffect(() => {
    const newTransaction = initListTransaction.current.filter((item) => {
      return item.title.toLowerCase().includes(debounceValue.toLowerCase());
    });
    setTransaction(newTransaction);
  }, [debounceValue]);
  return (
    <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        borderRadius="10"
        py="2"
        px="2"
        value={value}
        onChangeText={setValue}
        InputLeftElement={
          <Icon
            ml="2"
            size="4"
            color="gray.400"
            as={<Ionicons name="search" />}
          />
        }
      />
      <Box mt={4}>
        {transaction.map((item, index) => (
          <Box key={index} mb={4}>
            <HStack
              mb={2}
              p={2}
              backgroundColor="#DBE6FD"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">{item.title}</Text>

              <Text fontWeight="bold">{convertDate(item?.date)}</Text>
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
      </Box>
    </ScrollView>
  );
};
