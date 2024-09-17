import { View } from 'react-native';
import { Box, Divider, HStack, Icon, Text } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

const transactions = [
  { category: 'Ăn uống', amount: '1,000,000đ', type: 'expense' },
  { category: 'Chi tiêu hàng ngày', amount: '500,000đ', type: 'expense' },
];

export const ExpensesCategory = () => (
  <View style={{ flex: 1, padding: 16 }}>
    {transactions.map((transaction, index) => (
      <Box key={index}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            <Icon
              as={FontAwesome5}
              name={
                transaction.category === 'Ăn uống'
                  ? 'utensils'
                  : 'shopping-cart'
              }
              size="sm"
              color={
                transaction.category === 'Ăn uống' ? 'orange.500' : 'green.500'
              }
              mr={2}
            />
            <Text bold>{transaction.category}</Text>
          </HStack>
          <Text
            bold
            color={transaction.type === 'expense' ? 'red.500' : 'blue.500'}
          >
            {transaction.amount}
          </Text>
        </HStack>
        <Divider my={2} />
      </Box>
    ))}
  </View>
);
