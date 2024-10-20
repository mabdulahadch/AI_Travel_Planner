import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { Image } from "react-native";
import SearchPlace from "../../app/create-trip/searchPlace";
import { useRouter } from "expo-router";
export default function StartNewTripCard() {
  const router = useRouter();
  return (
    <View
      style={{
        padding: 10,
        marginTop: 30,
        display: "flex",
        alignItems: "center",
        gap: 25,
      }}
    >
      {/* <Ionicons name="location-outline" size={24} color="black" /> */}
      <Image
        source={require("./../../assets/images/people.jpg")}
        style={{
          height: 300,
          width: "100%",
          borderRadius: 150,
        }}
      ></Image>
      <Text
        style={{
          fontSize: 25,
          fontFamily: "outfit-bold",
          //marginTop: 10,
        }}
      >
        No Trip planned yet ?
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit",
          textAlign: "center",
          color: Colors.GREY,
        }}
      >
        Look like its time to plan a new travel experience! Get started below
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/create-trip/searchPlace")}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 99,
          paddingHorizontal: 40,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "outfit-medium",
            fontSize:13
          }}
        >
          Start New Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
