import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarBottom_customer from '../components/TabBarBottom_customer';
import { Cart_screen, Favorite_screen, HomeUser_screen, User_screen } from '../screens/index.screen';
import Home_Navigation from './Home_Navigation';

const Tab = createBottomTabNavigator();

export default function Bottom_Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ roter }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
      tabBar={(props) => {
        return (
          <TabBarBottom_customer descriptors={props.descriptors} navigation={props.navigation} state={props.state} />
        )
      }}
    >
      <Tab.Screen name='home' component={Home_Navigation} />
      <Tab.Screen name='favorite' component={Favorite_screen} />
      <Tab.Screen name='cart' component={Cart_screen} />
      <Tab.Screen name='profile' component={User_screen} />
      {/* <Tab.Screen name='setting' component={User_screen}/> */}

    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})