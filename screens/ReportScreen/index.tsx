import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { Monthly } from './Monthly';
import { Yearly } from './Yearly';

export const { width } = Dimensions.get('window');

enum ReportScreenRoute {
  MONTH = 'Tháng',
  YEAR = 'Năm',
}

export const renderTabBar = (props) => (
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

export const ReportScreen = () => {
  const navigation = useNavigation();

  const [screen, setScreen] = useState<ReportScreenRoute>(
    ReportScreenRoute.MONTH
  );

  const handleSetScreen = (value: ReportScreenRoute) => {
    setScreen(value);
  };

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
        <Box backgroundColor="#F6F9FF">
          <HStack justifyContent="space-between">
            <Center mb={4} flex={1}>
              <HStack alignItems="center">
                <Pressable
                  borderRadius={screen === ReportScreenRoute.MONTH ? 8 : 0}
                  bgColor={
                    screen === ReportScreenRoute.MONTH ? '#C0D3FC' : '#F6F9FF'
                  }
                  p={2}
                  px={4}
                  onPress={() => handleSetScreen(ReportScreenRoute.MONTH)}
                >
                  <Text>Hàng tháng</Text>
                </Pressable>
                <Pressable
                  borderRadius={screen === ReportScreenRoute.YEAR ? 8 : 0}
                  bgColor={
                    screen === ReportScreenRoute.YEAR ? '#C0D3FC' : '#F6F9FF'
                  }
                  p={2}
                  px={4}
                  onPress={() => handleSetScreen(ReportScreenRoute.YEAR)}
                >
                  <Text>Hàng năm</Text>
                </Pressable>
              </HStack>
            </Center>
            <IconButton
              onPress={() => {
                navigation.navigate('SearchRoute');
              }}
              icon={<Icon as={MaterialIcons} name="search" />}
              borderRadius="full"
            />
          </HStack>
          <Box flex={1}>
            {screen === ReportScreenRoute.MONTH ? <Monthly /> : <Yearly />}
          </Box>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eaeaea',
    paddingVertical: 8,
  },
});
