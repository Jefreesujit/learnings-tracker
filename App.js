import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './src/components/ThemeContext';
import Navigator from './src/components/Navigator';


export default function App() {
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(async () => {
    const userTheme = await AsyncStorage.getItem('theme');
    console.log('userTheme', userTheme);
    if (userTheme) {
      const newTheme = JSON.parse(userTheme);
      if (theme !== newTheme)
        setTheme(newTheme);
    }
  }, []);

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <NavigationContainer theme={theme} >
        <Navigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
