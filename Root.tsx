// core
import React from 'react';
import { StatusBar } from 'expo-status-bar';

// components & theme
import { ITheme, Spinner } from 'native-base';

// hooks
import useCachedResources from './hooks/useCachedResources';
import useAxiosConfig from './hooks/useAxiosConfig';

// navigation
import Navigation from './navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Root: React.FC<{ theme: ITheme }> = ({ theme }) => {
  const isLoadingComplete = useCachedResources();
  const isAxiosSetupComplete = useAxiosConfig();
  const insets = useSafeAreaInsets();

  return (
    <>
      {!isLoadingComplete && !isAxiosSetupComplete && <Spinner size="lg" />}
      {isLoadingComplete && isAxiosSetupComplete && (
        <>
          <Navigation theme={theme} />
          <StatusBar />
        </>
      )}
    </>
  );
};
