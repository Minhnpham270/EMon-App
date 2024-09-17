import { Icon, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon as={MaterialIcons} name="chevron-left" size="30" />
    </Pressable>
  );
};
