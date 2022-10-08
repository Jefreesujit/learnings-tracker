import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { ThemeProvider } from './src/components/ThemeContext';
import Navigator from './src/components/Navigator';


export default function App() {
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(async () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    const unSubscribe = messaging().subscribeToTopic('general').then(() => console.log('Subscribed to topic!'));

    const userTheme = await AsyncStorage.getItem('theme');
    console.log('userTheme', userTheme);
    if (userTheme) {
      const newTheme = JSON.parse(userTheme);
      if (theme !== newTheme)
        setTheme(newTheme);
    }

    return unSubscribe;
  }, []);

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <NavigationContainer theme={theme} >
        <Navigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
