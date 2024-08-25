import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Forgot_screen, SignIn_screen, SignUp_screen } from '../screens/index.screen';

const Stack = createStackNavigator();


export default function Auth_Navigation() {
  return (
    <Stack.Navigator initialRouteName='signup' screenOptions={{headerShown: false}}>
        <Stack.Screen name='signup' component={SignUp_screen}/>
        <Stack.Screen name='signin' component={SignIn_screen}/>
        <Stack.Screen name='forgot' component={Forgot_screen}/>
    </Stack.Navigator>
  )
}