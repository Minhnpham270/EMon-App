import React from 'react';
import { HamburgerIcon, Menu, Pressable, Row, Text } from 'native-base';
// type
import { RootStackParamList } from './types';
// navigation
import { useNavigation } from '@react-navigation/native';
// state(redux)
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthData } from '../lib/redux/reducers/authReducer';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '../lib/redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { resetNewInvoice } from '../lib/redux/reducers/invoiceReducer';

type NavigationProp = NativeStackScreenProps<RootStackParamList>;

export const NavMenu = () => {
  const navigation = useNavigation<NavigationProp['navigation']>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { newInvoice } = useSelector((state: RootState) => state.invoice);
  const doLogout = () => {
    dispatch(resetAuthData());
    navigation.navigate('Signin');
  };

  const resetInvoice = () => {
    dispatch(resetNewInvoice());
  };

  return (
    <Row space={2}>
      <Menu
        closeOnSelect={true}
        trigger={(triggerProps) => {
          return (
            <Pressable
              accessibilityLabel="More options menu"
              {...triggerProps}
              mr={2}
            >
              <MaterialCommunityIcons
                style={{
                  color:
                    newInvoice?.length > 0
                      ? 'rgba(229,39,39,0.61)'
                      : '#2323239B',
                  fontSize: 20,
                }}
                name={
                  newInvoice?.length > 0 ? 'bell-badge-outline' : 'bell-outline'
                }
              ></MaterialCommunityIcons>
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={resetInvoice}>
          <Text p={2}>{newInvoice?.length} đơn hàng mới được tạo</Text>
        </Menu.Item>
      </Menu>
      <Menu
        closeOnSelect={true}
        trigger={(triggerProps) => {
          return (
            <Pressable
              accessibilityLabel="More options menu"
              {...triggerProps}
              mr={2}
            >
              <HamburgerIcon size="sm" />
            </Pressable>
          );
        }}
      >
        {user?.roleId === 1 && (
          <Menu.Item onPress={() => navigation.navigate('User')}>
            <Text>Danh sách Nhân viên</Text>
          </Menu.Item>
        )}
        <Menu.Item onPress={() => doLogout()}>
          <Text>Sign out</Text>
        </Menu.Item>
      </Menu>
    </Row>
  );
};
