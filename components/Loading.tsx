import { Box } from 'native-base';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

export const Loading = () => {
  return (
    <Box alignItems="center">
      <ActivityIndicator size="large" color="#0000ff" />
    </Box>
  );
};
