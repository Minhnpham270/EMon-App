import React from 'react';
// navigation
import { TabBar, TabView } from 'react-native-tab-view';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Revenue } from './Revenue';
import { Spending } from './Spending';

const initialLayout = { width: Dimensions.get('window').width };

export const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Tiền chi' },
    { key: 'second', title: 'Tiền thu' },
  ]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'first':
        return <Revenue jumpTo={jumpTo} />;
      case 'second':
        return <Spending jumpTo={jumpTo} />;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'transparent' }}
      contentContainerStyle={styles.tabBarContent}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <View style={[styles.tabItem, focused && styles.tabItemActive]}>
          <Text style={[styles.label, focused && styles.labelActive]}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },
  tabItem: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: 80,
  },
  tabItemActive: {
    backgroundColor: '#b0c4de',
  },
  label: {
    fontSize: 12,
    color: 'black',
  },
  labelActive: {
    fontWeight: 'bold',
  },
  tabBarContent: {
    flexDirection: 'row',
    justifyContent: 'center', // Căn giữa các tab
    // alignItems: 'center',
  },
});
