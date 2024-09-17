import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  useToast,
  VStack,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { db } from '../../../hooks/useFirestorage';
import { ICategory } from '../../../types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { addDoc, collection, doc } from 'firebase/firestore';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export const Revenue = () => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const toast = useToast();
  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const onPressRevenue = async () => {
    try {
      const categoryRef = await doc(db, 'category', categorySelected); // Thay thế bằng ID thực tế của tài liệu category

      const transactionRecord = {
        category: categoryRef, // Thay thế bằng đường dẫn tham chiếu thực tế của bạn
        date: Timestamp.fromDate(date), // Sử dụng thời gian hiện tại
        amount: Number(amount ?? 0),
        title: title,
        isRevenue: true,
        title_lowercase: title.toLowerCase(),
      };
      // Thêm bản ghi vào collection "revenue"
      const docRef = await addDoc(
        collection(db, 'transaction'),
        transactionRecord
      );
      setAmount('');
      setCategorySelected('');
      setTitle('');
      toast.show({
        title: 'Thêm khoản chi thành công',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {
    db.collection('category').onSnapshot({
      next: (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
        }));
        setCategory(data);
      },
    });
  }, [setCategory]);

  return (
    <ScrollView>
      <Center flex={1} px="3">
        <Box w="100%" p="4">
          <VStack justifyContent="space-between" alignItems="flex-end">
            <Text>Số tiền</Text>
            <Input
              value={amount}
              onChangeText={setAmount}
              borderWidth={0}
              size="2xl"
              variant="unstyled"
              borderColor={'transparent'}
              flex={1}
              textAlign="right"
              py="1"
              px="2"
            />
          </VStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <IconButton
              icon={<Icon as={MaterialIcons} name="calendar-today" />}
              borderRadius="full"
              onPress={() => setShowDatePicker(true)}
            />
            <Text ml="2">{date.toLocaleDateString()}</Text>
          </HStack>
          <Divider my="2" />
          <Input
            value={title}
            onChangeText={setTitle}
            placeholder="Ghi chú"
            variant="underlined"
            placeholderTextColor="gray.400"
            py={4}
            px={2}
            InputLeftElement={
              <Icon
                as={MaterialCommunityIcons}
                name="note-outline"
                size={19}
                ml={2}
              />
            }
            mb={4}
          />
          <Text my="4" fontWeight="bold">
            Danh mục
          </Text>
          <HStack justifyContent="flex-start" flexWrap="wrap">
            {category.map((cate, index) => (
              <Button
                width="30%"
                key={index}
                bgColor={categorySelected === cate.id ? 'blue.400' : 'white'}
                variant="outline"
                borderRadius="10"
                py="4"
                px="4"
                my="1"
                mx="1"
                onPress={() => setCategorySelected(cate.id)}
              >
                <VStack alignItems="center">
                  <Image
                    source={{ uri: cate?.image }}
                    style={{ width: 24, height: 24, paddingBottom: 8 }}
                  />
                  <Text>{cate?.title}</Text>
                </VStack>
              </Button>
            ))}
          </HStack>
          <Button
            mt="6"
            borderRadius="full"
            bg="blue.400"
            py="3"
            _text={{ color: 'white' }}
            onPress={onPressRevenue}
          >
            Nhập khoản chi
          </Button>
        </Box>
      </Center>
      <DateTimePickerModal
        date={date}
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};
