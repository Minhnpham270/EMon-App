import { PropsItem } from '../../CartScreen/Item1';
import { Box, Column, Heading, Icon, Row, Text } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../lib/redux/reducers/productReducer';
import { TouchableRipple } from 'react-native-paper';
import { useRoleAdmin } from '../../../hooks/useRoleAdmin';
import { Image } from 'expo-image';

export const Item2 = ({ item, openItem }: PropsItem) => {
  const dispatch = useDispatch();

  const addItemToCart = (item: any) => {
    dispatch(
      addToCart({
        ...item,
        count: 1,
      })
    );
  };

  return (
    <TouchableRipple
      onPress={() => {
        if (openItem) openItem(item);
        else addItemToCart(item);
      }}
    >
      <Box
        borderBottomWidth="1"
        _light={{
          borderColor: 'light.border',
        }}
        _dark={{
          borderColor: 'dark.border',
        }}
        pl="4"
        pr="5"
        py="2"
      >
        <Row alignContent="stretch" width="100%">
          <Column justifyContent="center" flex={1}>
            <Icon
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={(event) => {
                event.preventDefault();
                addItemToCart(item);
              }}
              as={Octicons}
              color="#E80843"
              name="plus"
              size={30}
              mr={3}
            />
          </Column>
          <Column flex={3}>
            <Image
              style={{ width: 100, height: 80, borderRadius: 10 }} // style={{ width: 50, height: 50 }}
              source={{
                uri: item.productDescription,
              }}
            ></Image>
          </Column>
          <Column flex={6} pl={3}>
            <Heading fontSize="sm">{item.productName}</Heading>
            <Text fontSize="xs">Mã sản phẩm: {item.productSKU}</Text>

            <Text
              color={item.productQuantity < 5 ? 'orange.600' : '#000e21'}
              fontSize={item.productQuantity < 5 ? 'lg' : 'xs'}
            >
              Tồn kho: {item.productQuantity - (item.productQuantitySold || 0)}
            </Text>

            {useRoleAdmin() && (
              <Text fontSize="xs">Giá nhập: {item.productCost}</Text>
            )}
            <Row alignItems="center" justifyContent="space-between">
              <Text fontSize="sm" color="orange.600">
                đ{item.productPrice}
              </Text>
              <Text fontSize="10">Đã bán: {item.productQuantitySold || 0}</Text>
            </Row>
          </Column>
        </Row>
      </Box>
    </TouchableRipple>
  );
};
