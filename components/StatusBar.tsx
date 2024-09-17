import React, { ReactElement } from 'react';
import { StatusBar as RNStatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StatusBar(): ReactElement {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height: insets.top,
        backgroundColor: '#FCFCFC',
      }}
    >
      <RNStatusBar backgroundColor={'#FCFCFC'} barStyle={'light-content'} />
    </View>
  );
}
