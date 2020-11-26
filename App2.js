import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

import useDatabase from './hooks/useDatabase'
import useCachedResources from './hooks/useCachedResources';

import {UsersContextProvider} from './context/UsersContext'

import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

const Stack = createStackNavigator();

export default function App(props) {
  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useCachedResources();
  const isDBLoadingComplete = useDatabase();

  if (isLoadingComplete && isDBLoadingComplete) {
    SplashScreen.hideAsync();

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <UsersContextProvider>
          <NavigationContainer linking={LinkingConfiguration} >
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </UsersContextProvider>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
