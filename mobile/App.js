import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import MainNavigator from './src/navigation/MainNavigator';


export default function App() {
  const [fontsLoaded] = useFonts({
    'SF-Pro-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
    'SF-Pro-Medium': require('./assets/fonts/SF-Pro-Display-Medium.otf'),
    'SF-Pro-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Pro-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
  });

  if (!fontsLoaded) return null;
  return <MainNavigator />;
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A81FA',
  },
});