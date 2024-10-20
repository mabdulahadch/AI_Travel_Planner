import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/AntDesign';

import Entypo from '@expo/vector-icons/Entypo';
import {Colors} from './../../constants/Colors';

import Ionicons from "@expo/vector-icons/Ionicons";

export default function _layout() {
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tabs.Screen name="mytrip"
        options={{
            tabBarLabel: 'My Trips',
            tabBarIcon: ({ color, focused }) => (
              <View style={{ marginBottom: focused ? 5 : 0 }}>
                <AntDesign name="home" size={24} color={color} />
              </View>
            ),
          }}/>
        <Tabs.Screen name="discover"
        options={{
            tabBarLabel:'Discover',
            tabBarIcon:({color, focused})=>(
                <View style={{ marginBottom: focused ? 5 : 0 }}>
                <Fontisto name="compass-alt" size={24}  color={color}/>
                </View>
            )
        }}/>
        <Tabs.Screen name="favorites"
        options={{
            tabBarLabel:'Favorites',
            tabBarIcon:({color, focused})=>(
                <View style={{ marginBottom: focused ? 5 : 0 }}>
                <Ionicons name="heart-outline" size={30} color={color} />
                </View>
            )
        }}/>
    </Tabs>
  )
}