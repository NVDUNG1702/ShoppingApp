import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigations/Navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({});
