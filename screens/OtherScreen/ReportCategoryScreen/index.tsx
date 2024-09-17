import React from 'react';
import { ScrollView, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { SceneMap, TabBar } from 'react-native-tab-view';
import { ExpensesCategory } from './Expense';
import { IncomeCategory } from './Income';
import { Yearly } from '../../ReportScreen/Yearly';

const { width } = Dimensions.get('window');

const renderScene = SceneMap({
  expenses: ExpensesCategory,
  income: IncomeCategory,
});

const renderTabBar = (props) => (
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

const ReportCategoryScreen = () => {
  return (
    <ScrollView bg="white" contentContainerStyle={{ flexGrow: 1 }}>
      <Yearly reportCategoryScreen={true} />
    </ScrollView>
  );
};

export default ReportCategoryScreen;
