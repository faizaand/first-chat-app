import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './components/Main';
import Chat from './components/Chat';

const AppNavigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
