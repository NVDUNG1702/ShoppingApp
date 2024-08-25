import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DetailProduct_screen, HomeUser_screen } from '../screens/index.screen';

const Stack = createStackNavigator();

export default function Home_Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home_screen' component={HomeUser_screen} />
      
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})