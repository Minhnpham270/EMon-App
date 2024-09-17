import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using Expo

const OtherScreen = () => {
  const navigate = useNavigation();
  return (
    <ScrollView bg="white">
      <Box px="4" w="100%" mx="auto" bg="white">
        <Text fontSize="xl" bold textAlign="center">
          Khác
        </Text>
        <Divider my="1" />

        <Pressable
          mt={6}
          py={3}
          px={2}
          borderRadius={8}
          bgColor="#F6F9FF"
          onPress={() => {
            /* Handle press */
          }}
        >
          <HStack space={3} justifyContent="space-between" alignItems="center">
            <HStack space={3} alignItems="center">
              <Icon as={MaterialIcons} name="settings" size="lg" />
              <Text>Cài đặt cơ bản</Text>
            </HStack>
            <Icon as={MaterialIcons} name="chevron-right" size="lg" />
          </HStack>
        </Pressable>

        <VStack
          space={4}
          mt="4"
          bgColor="#F6F9FF"
          borderRadius={8}
          py={3}
          px={2}
        >
          <Pressable
            onPress={() => {
              navigate.navigate('ReportYear');
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon as={MaterialCommunityIcons} name="chart-line" size="lg" />
                <Text>Báo cáo năm</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="lg" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              navigate.navigate('ReportCategory');
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon as={MaterialCommunityIcons} name="chart-pie" size="lg" />
                <Text>Báo cáo danh mục trong năm</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="lg" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              navigate.navigate('DetailReportCategory');
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon as={MaterialCommunityIcons} name="chart-bar" size="lg" />
                <Text>Báo cáo toàn kỳ</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="lg" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              navigate.navigate('ReportTotalYearTotal');
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon
                  as={MaterialCommunityIcons}
                  name="chart-line-stacked"
                  size="lg"
                />
                <Text>Báo cáo danh mục toàn kỳ</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="lg" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              navigate.navigate('ReportYear');
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon
                  as={MaterialCommunityIcons}
                  name="swap-vertical"
                  size="lg"
                />
                <Text>Báo cáo thay đổi số dư</Text>
              </HStack>

              <Icon as={MaterialIcons} name="chevron-right" size="lg" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              /* Handle press */
              navigate.navigate('SearchRoute');
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon as={MaterialIcons} name="search" size="lg" />
                <Text>Tìm kiếm giao dịch</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="lg" />
            </HStack>
          </Pressable>
        </VStack>

        <Pressable
          mt="4"
          bgColor="#F6F9FF"
          borderRadius={8}
          py={3}
          px={2}
          onPress={() => {
            /* Handle press */
          }}
        >
          <HStack space={3} justifyContent="space-between" alignItems="center">
            <HStack space={3} alignItems="center">
              <Icon as={MaterialIcons} name="help-outline" size="lg" />
              <Text>Trợ giúp</Text>
            </HStack>
            <Icon as={MaterialIcons} name="chevron-right" size="lg" />
          </HStack>
        </Pressable>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5', // background color similar to your screenshot
  },
});

export default OtherScreen;
