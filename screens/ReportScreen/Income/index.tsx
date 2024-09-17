import React, { useMemo } from 'react';
import { Image, View } from 'react-native';
import { Box, Divider, HStack, Text } from 'native-base';
import { ITransaction } from '../../../types';

export const IncomeRoute = ({
  data,
  showTotal,
}: {
  data: ITransaction[];
  showTotal?: boolean;
}) => {
  const totals = useMemo(() => {
    return data.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  }, [data]);

  const totalsCategoryAmount = useMemo(() => {
    return data.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.title === item.category.title);
      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        acc.push({
          title: item.category.title,
          amount: item.amount,
          image: item.category.image,
          isRevenue: item.isRevenue ?? false,
        });
      }
      return acc;
    }, [] as { title: string; amount: number; image: string; isRevenue: boolean }[]);
  }, [data]);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      {showTotal && (
        <Box my={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
              <Text fontWeight="bold">Tổng</Text>
            </HStack>
            <Text fontWeight="bold">{totals}đ</Text>
          </HStack>
        </Box>
      )}
      {totalsCategoryAmount.map((item, index) => (
        <Box key={index}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
              <Image
                source={{ uri: item?.image }}
                style={{ width: 24, height: 24, paddingBottom: 8 }}
              />
              <Text mx={2} fontWeight="bold">
                {item?.title}
              </Text>
            </HStack>
            <Text
              fontWeight="bold"
              color={item?.isRevenue ? 'red.500' : 'blue.500'}
            >
              {item?.amount}đ
            </Text>
          </HStack>
          <Divider my={2} />
        </Box>
      ))}
    </View>
  );
};
