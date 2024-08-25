import { View, Text, Image } from 'react-native';
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DetailProduct_screen, EditPassword_screen, EditProfile_creen, HistoryOrder_screen, Intro_screen, OrderConfirmation_screen, OtpAuthenticProfile_screen, ReceivingInformation_screen } from '../screens/index.screen';
import Auth_Navigation from './Auth_Navigation';
// import Home_Navigation from './Home_Navigation';
import Bottom_Navigation from './Bottom_Navigation';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='intro' component={Intro_screen} />
                <Stack.Screen name='auth' component={Auth_Navigation} />
                <Stack.Screen name='bottom' component={Bottom_Navigation} />
                <Stack.Screen name='detailProduct' component={DetailProduct_screen} />
                <Stack.Screen name='orderConfirmation' component={OrderConfirmation_screen} />
                <Stack.Screen name='receivingInformation' component={ReceivingInformation_screen} />
                <Stack.Screen name='historyCart' component={HistoryOrder_screen} />
                <Stack.Screen name='editProfile' component={EditProfile_creen} />
                <Stack.Screen name='editPassword' component={EditPassword_screen} />
                <Stack.Screen name='otpAuthenticProfile' component={OtpAuthenticProfile_screen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}