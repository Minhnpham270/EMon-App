/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { ReactElement, useCallback } from 'react';

/**
 * Regarding Themeing, Please check following.
 * https://reactnavigation.org/docs/themes/
 */
// theme
import { ITheme } from 'native-base';
import { navDarkTheme, navLightTheme } from '../theme';

// routing
// type
import { RootStackParamList } from './types';

// components
// state(redux)
import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import * as Linking from 'expo-linking';
import RouteList from './RouteList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabContent from './BottomTabContent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackButton } from '../components/BackButton';

const BottomTab = createBottomTabNavigator();

function BottomTabScreen(): ReactElement {
  const tabBar = useCallback((): ReactElement => <BottomTabContent />, []);

  return (
    <BottomTab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
      {RouteList.map(
        ({ name, component, isBottom, title }) =>
          isBottom && (
            <BottomTab.Screen
              name={name}
              component={component}
              key={name}
              options={{
                headerTitleStyle: {
                  display: 'none',
                },
                headerShown: false,
              }}
            />
          )
      )}
    </BottomTab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function Navigator({ theme }: { theme: ITheme }) {
  const { user, token } = useSelector((state: RootState) => state.auth);

  console.log('token----', token);

  return (
    <NavigationContainer
      linking={linking}
      theme={
        theme.config?.initialColorMode === 'dark' ? navDarkTheme : navLightTheme
      }
    >
      <Stack.Navigator initialRouteName={!token ? 'BottomTab' : 'SignIn'}>
        <Stack.Screen
          name="BottomTab"
          component={BottomTabScreen}
          options={{
            headerShown: false,
          }}
        />
        {RouteList.map(({ title, name, component, isBottom }) => {
          if (!isBottom) {
            return (
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: title,
                  headerLeft: () => <BackButton />,
                }}
                name={name}
                component={component}
                key={name}
              />
            );
          }
          return null;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Signin: 'signin',
      Signup: 'signup',
      List: 'list',
      Settings: 'settings',
    },
  },
};
