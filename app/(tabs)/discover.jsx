import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Colors } from "../../constants/Colors";

import PopularPlaces from "./../../component/Discover/popularPlaces";

//import Ionicons from "@expo/vector-icons/Ionicons";
import Ionicons from '@expo/vector-icons/Fontisto';

export default function Discover() {
  const popularDestinations = [
    "Paris, France",
    "Tokyo, Japan",
    "New York, USA",
    "Sydney, Australia",
    "Rome, Italy",
    "Cape Town, South Africa",
    "Barcelona, Spain",
    "Dubai, UAE",
  ];

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 35,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 33,
          }}
        >
          Discover
        </Text>

        <Text
          style={{
            fontSize: 17,
            fontFamily: "outfit-medium",
            color: Colors.GREY,
            paddingTop: 3,
          }}
        >
          Popular destinations
        </Text>
      </View>

      <Ionicons name="world-o" size={33} color="black" paddingTop={5} />
      </View>

      <FlatList
          style={{
            marginTop: 10,
          }}
          showsVerticalScrollIndicator={false}
          data={popularDestinations}
          renderItem={({ item, index }) => <PopularPlaces item={item} />}
        />

    </View>
  );
}
